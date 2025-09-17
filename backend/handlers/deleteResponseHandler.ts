import {Response} from 'express';
import {isNil} from 'ramda';
import {match} from 'ts-pattern';
import {ERROR_CODES} from '../error-codes/errorCodes';

export const deleteResponseHandler =
  (res: Response) => (error?: Error | null, numRemoved?: number) =>
    match([isNil(error), numRemoved])
      .with([true, 0], () => res.status(404).json({error: ERROR_CODES.TODO_NOT_FOUND}))
      .with([true, 1], () => res.sendStatus(204))
      .otherwise(() => res.status(500).json({error: ERROR_CODES.INTERNAL_SERVER_ERROR}));
