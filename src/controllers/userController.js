// src/controllers/userController.js

// import createHttpError from 'http-errors';
import { User } from '../models/user.js';
// import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

// export const updateUserAvatar = async (req, res, next) => {
//   if (!req.file) {
//     next(createHttpError(400, 'No file'));
//     return;
//   }

//   const result = await saveFileToCloudinary(req.file.buffer);

//   const user = await User.findByIdAndUpdate(
//     req.user._id,
//     { avatar: result.secure_url },
//     { new: true },
//   );

//   res.status(200).json({ url: user.avatar });
// };

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
};
