import express , {Request, Response} from 'express';
import { Profile } from '../models/profile';
import { requirePermission, ProfileActionTypes } from '@oka-web/common';


const router = express.Router();
const actionType = ProfileActionTypes.INDEX_PROFILE;
router.get('/api/profiles', 
 requirePermission(actionType),
async (req: Request, res: Response) => {
  const profileList = await Profile.find({});
  res.status(200).send({  profileList });
}
);

export { router as indexProfileRouter};