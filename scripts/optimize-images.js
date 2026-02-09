#!/usr/bin/env node
// @ts-nocheck

/**
 * Image Optimization Script
 * Converts PNG images to WebP format for better performance
 * Requires: npm install sharp --save-dev
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const QUALITY = 85; // WebP quality (0-100)

async function convertImageToWebP(imagePath) {
  try {
    const ext = path.extname(imagePath).toLowerCase();
    
    // Only process PNG files
    if (ext !== '.png') {
      return null;
    }

    const outputPath = imagePath.replace(/\.png$/i, '.webp');
    
    // Skip if WebP already exists
    try {
      await fs.access(outputPath);
      console.log(`⏭️  Skipping ${path.basename(imagePath)} (WebP exists)`);
      return null;
    } catch {
      // WebP doesn't exist, proceed with conversion
    }

    const startTime = Date.now();
    const stats = await fs.stat(imagePath);
    const originalSize = stats.size;

    await sharp(imagePath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const newStats = await fs.stat(outputPath);
    const newSize = newStats.size;
    const savings = ((1 - newSize / originalSize) * 100).toFixed(1);
    const duration = Date.now() - startTime;

    console.log(
      `✅ ${path.basename(imagePath)} → ${path.basename(outputPath)} ` +
      `(${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB, ` +
      `-${savings}%, ${duration}ms)`
    );

    return { originalSize, newSize, savings: parseFloat(savings) };
  } catch (error) {
    console.error(`❌ Error converting ${imagePath}:`, error.message);
    return null;
  }
}

async function processDirectory(dirPath) {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    const results = [];

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        // Recursively process subdirectories
        const subResults = await processDirectory(fullPath);
        results.push(...subResults);
      } else if (entry.isFile() && entry.name.endsWith('.png')) {
        const result = await convertImageToWebP(fullPath);
        if (result) {
          results.push(result);
        }
      }
    }

    return results;
  } catch (error) {
    console.error(`❌ Error processing directory ${dirPath}:`, error.message);
    return [];
  }
}

async function main() {
  console.log('🖼️  Image Optimization Script');
  console.log('================================\n');

  // Check if sharp is installed
  try {
    require.resolve('sharp');
  } catch {
    console.error('❌ Error: sharp is not installed');
    console.error('Please run: npm install sharp --save-dev');
    process.exit(1);
  }

  console.log(`📁 Processing images in: ${PUBLIC_DIR}\n`);

  const startTime = Date.now();
  const results = await processDirectory(PUBLIC_DIR);

  if (results.length === 0) {
    console.log('\n✨ No images to convert (all PNGs already have WebP versions)');
    return;
  }

  const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
  const totalNew = results.reduce((sum, r) => sum + r.newSize, 0);
  const totalSavings = ((1 - totalNew / totalOriginal) * 100).toFixed(1);
  const duration = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log('\n================================');
  console.log('📊 Summary:');
  console.log(`   Images converted: ${results.length}`);
  console.log(`   Original size: ${(totalOriginal / 1024 / 1024).toFixed(2)}MB`);
  console.log(`   New size: ${(totalNew / 1024 / 1024).toFixed(2)}MB`);
  console.log(`   Total savings: ${totalSavings}% (${((totalOriginal - totalNew) / 1024 / 1024).toFixed(2)}MB)`);
  console.log(`   Time taken: ${duration}s`);
  console.log('================================\n');
  console.log('✅ Done! WebP images created alongside original PNGs');
  console.log('💡 Tip: Update image references to use .webp extension for better performance');
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
