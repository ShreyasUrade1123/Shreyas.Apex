import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

// === Apple API Credentials ===
const TEAM_ID = 'NJBH8DAQ4G';
const SERVICE_ID = 'stomato.weather';
const KEY_ID = 'R6H438Y9R3';
const PRIVATE_KEY_PATH = path.join(process.cwd(), 'src/utils/AuthKey_DQ362YMNMP.p8');

// === Weather API Parameters ===
const LANGUAGE = 'en';
const DEFAULT_LATITUDE = '10.762622';
const DEFAULT_LONGITUDE = '106.660172';
const DEFAULT_TIMEZONE = 'Asia/Ho_Chi_Minh';
const DATASETS = ['currentWeather', 'forecastDaily'];

export async function GET(request: Request) {
  try {
    // Lấy tham số từ URL (nếu có)
    const { searchParams } = new URL(request.url);
    const latitude = searchParams.get('latitude') || DEFAULT_LATITUDE;
    const longitude = searchParams.get('longitude') || DEFAULT_LONGITUDE;
    const timezone = searchParams.get('timezone') || DEFAULT_TIMEZONE;
    const language = searchParams.get('language') || LANGUAGE;
    
    // Đọc private key
    const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, 'utf-8');
    
    // Tạo JWT Token
    const currentTime = Math.floor(Date.now() / 1000);
    const expiryTime = currentTime + 3600; // Token hết hạn sau 1 giờ
    
    const payload = {
      'iss': TEAM_ID,
      'iat': currentTime,
      'exp': expiryTime,
      'sub': SERVICE_ID
    };
    
    const headers = {
      "kid": KEY_ID,
      "id": `${TEAM_ID}.${SERVICE_ID}`
    };
    
    const token = jwt.sign(payload, privateKey, { 
      algorithm: 'ES256', 
      header: headers 
    });
    
    // Gọi Weather API với timeout
    const url = `https://weatherkit.apple.com/api/v1/weather/${language}/${latitude}/${longitude}`;
    const params = new URLSearchParams({
      timezone,
      dataSets: DATASETS.join(',')
    });

    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${url}?${params.toString()}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      },
      signal: controller.signal,
      // Bỏ qua xác minh SSL trong môi trường phát triển
      // Lưu ý: Trong môi trường production, bạn nên bật xác minh SSL
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Weather API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Trả về dữ liệu thời tiết dưới dạng JSON
    return NextResponse.json(data);

  } catch (error) {
    console.error('Error fetching weather data:', error);

    // Handle specific error types
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return NextResponse.json(
          { error: 'Weather API request timed out' },
          { status: 504 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}