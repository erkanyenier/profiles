import express, { Request, Response } from 'express';
import {body, validationResult} from 'express-validator';
import {
  BadRequestError,
  requirePermission,
  ProfileActionTypes
} from '@oka-web/common';

import {Profile} from '../models/profile';

const router = express.Router();

const actionType = ProfileActionTypes.UPDATE_PROFILE;



router.put(
  '/api/profiles/update/:uname',
  [
    body('username')
    .trim()
    .notEmpty()
    .withMessage('kullanıcı adı dolu olmalı'),
    body('name')
    .trim()
    .notEmpty()
    .withMessage('name dolu olmalı'),
],
  requirePermission(actionType),
  
  async (req: Request, res: Response) => {
    const { uname } = req.params;
    // Check if profile exists
    const{username,name, surname,birthDate,mailPermision,isProfileActivated, companyTitle} = req.body;
    const profile = await Profile.findOne({username:uname})
  

    if (!profile) {
      throw new BadRequestError('Bu profilı mevcut değil.');
    }
    if (profile?.username != username)
    {
      throw new BadRequestError('Kullanıcı Adı değiştirilemez.');
    }
    profile.name = name;
    profile.surname = surname;
    profile.birthDate = birthDate;
    profile.mailPermision = mailPermision;
    profile.isProfileActivated = isProfileActivated;
    profile.companyTitle = companyTitle;
    profile.save();
    res.status(200).send(profile);
  }
);

export { router as updateProfileRouter };