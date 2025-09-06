import jwt from 'jsonwebtoken';

// JWT config
const JWT_SECRET = 'secret';
const JWT_EXPIRES = '7d';

// JWT payload
export interface JwtPayload {
  userId: string;
  email: string;
  username: string;
}

export function generateAccessToken(payload: JwtPayload): string {
  try {
    return jwt.sign(
      {
        userId: payload.userId,
        email: payload.email,
        username: payload.username,
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES,
      } as jwt.SignOptions
    );
  } catch (_error) {
    throw new Error('Failed to generate access token');
  }
}

export function verifyToken(token: string): JwtPayload {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    // Extract payload
    return {
      userId: decoded.userId,
      email: decoded.email,
      username: decoded.username,
    };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token has expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token');
    }
    throw new Error('Token verification failed');
  }
}

// Extract token from Authorization header
export function extractTokenFromHeader(authHeader: string | undefined): string | null {
  if (!authHeader) {
    return null;
  }

  // Check for Bearer token format
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  return null;
}
