import express, {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {isNil, isNotNil} from 'ramda';
import {isNilOrEmpty} from 'ramda-adjunct';
import {v4 as uuid} from 'uuid';
import {User, userDB} from '../database/users';
import {validateCredentialsFromBody} from '../validators/validateCredentialsFromBody';
import {signAccessToken} from '../utils/signAccessToken';
import {signRefreshToken} from '../utils/signRefreshToken';
import {hashPassword} from '../utils/hashPassword';
import {comparePassword} from '../utils/comparePassword';
import {setRefreshCookie} from '../utils/cookies';
import {ERROR_CODES} from '../error-codes/errorCodes';

const userRoutes = express.Router();

userRoutes.post('/api/register', (req: Request, res: Response) => {
  const {password, username} = validateCredentialsFromBody(req, res);
  const hashedPassword = hashPassword(password);

  userDB.findOne({username}, (err: Error | null, user: User) => {
    if (isNotNil(err)) return res.status(500).json({error: ERROR_CODES.INTERNAL_SERVER_ERROR});
    if (isNotNil(user)) return res.status(400).json({error: ERROR_CODES.USERNAME_TAKEN});

    const newUser: User = {
      id: uuid(),
      createdAt: new Date().toISOString(),
      username,
      password: hashedPassword,
    };

    userDB.insert(newUser);

    const accessToken = signAccessToken(newUser.id, username);
    const refreshToken = signRefreshToken(newUser.id, username);

    setRefreshCookie(res, refreshToken);

    res.status(201).json({accessToken});
  });
});

userRoutes.post('/api/login', (req: Request, res: Response) => {
  const {password, username} = validateCredentialsFromBody(req, res);

  userDB.findOne({username}, (err: Error | null, user: User | null) => {
    if (isNotNil(err)) return res.status(500).json({error: ERROR_CODES.INTERNAL_SERVER_ERROR});
    if (isNil(user)) return res.status(404).json({error: ERROR_CODES.USER_NOT_FOUND});

    if (!comparePassword(password, user.password)) {
      return res.status(401).json({error: ERROR_CODES.INVALID_CREDENTIALS});
    }

    const accessToken = signAccessToken(user.id, username);
    const refreshToken = signRefreshToken(user.id, username);

    setRefreshCookie(res, refreshToken);

    res.status(200).json({accessToken});
  });
});

userRoutes.post('/api/refresh-token', (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (isNilOrEmpty(refreshToken)) {
    return res.status(400).json({error: ERROR_CODES.REFRESH_TOKEN_EMPTY});
  }

  jwt.verify(refreshToken, process.env.REFRESH_KEY, (err: any, user: any) => {
    if (err) return res.status(401).json({error: ERROR_CODES.INVALID_REFRESH_TOKEN});

    const accessToken = signAccessToken(user.userId, user.username);
    const newRefreshToken = signRefreshToken(user.userId, user.username);

    setRefreshCookie(res, newRefreshToken);

    return res.json({accessToken});
  });
});

export default userRoutes;
