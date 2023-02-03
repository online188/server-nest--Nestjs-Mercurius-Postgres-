import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  use(req: any, res: any, next: () => void) {
    // const accessToken = req.rawHeaders[3].split(' ')[1]; // Lấy ra token

    let accessToken;
    try {
      accessToken = req.headers.authorization.substring(
        7,
        req.headers.authorization.length,
      );
    } catch (err) {}

    console.log(accessToken);

    try {
      const { username } = this.jwtService.verify(accessToken);
      console.log('username trong Middleware: ', username);
      req.user = { username };
    } catch (err) {}

    // try {
    //   const payload = jwt.verify(accessToken, jwtConstants.secret);
    //   console.log(payload);
    //   req.user = payload;
    // } catch (err) {}

    next();
  }
}
