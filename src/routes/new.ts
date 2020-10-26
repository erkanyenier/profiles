import express , {Request, Response} from 'express';
import {body, validationResult} from 'express-validator';
import { requirePermission, ProfileActionTypes } from '@oka-web/common';

import {Profile} from '../models/profile';

const router = express.Router();

const actionType = ProfileActionTypes.NEW_PROFILE;

router.post('/api/profiles/new',
  requirePermission(actionType),
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
async(req: Request,res: Response) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const{username,name, surname,birthDate,mailPermision,isProfileActivated, companyTitle} = req.body;

    const existingProfile = await Profile.findOne({username: username});
    
    if (existingProfile){
      return res.status(400).json({errors: ['Bu user var']});
    }

    const profile = Profile.build({username,name, surname,birthDate,mailPermision,isProfileActivated: isProfileActivated, companyTitle});
    await profile.save();
    res.status(201).send(profile);

} 
);


export { router as newProfileRouter};