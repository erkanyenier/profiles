import express, { Request, Response } from 'express';
import {
  BadRequestError,
  requirePermission,
  ProfileActionTypes
} from '@oka-web/common';

import {Profile} from '../models/profile';

const router = express.Router();

const actionType = ProfileActionTypes.SHOW_PROFILE;


router.get(
  '/api/profiles/show/:uname',
  requirePermission(actionType),
  async (req: Request, res: Response) => {
    const { uname } = req.params;
    // Check if profile exists
    const profile = await Profile.findOne({username:uname})

    if (!profile) {
      throw new BadRequestError('Bu profilı mevcut değil.');
    }


    res.status(200).send(profile);
  }
);

export { router as showProfileRouter };