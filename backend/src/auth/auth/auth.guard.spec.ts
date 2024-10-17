import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';

describe('AuthGuard', () => {
  let mockJwtService: JwtService;

  beforeEach(() => {
    mockJwtService = new JwtService({}); // Provide necessary configuration or leave empty
  });

  it('should be defined', () => {
    const guard = new AuthGuard(mockJwtService);
    expect(guard).toBeDefined();
  });
});
