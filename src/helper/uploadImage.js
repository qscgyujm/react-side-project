export const uploadImage = (
  e,
  uploadAction,
  uploadResolveAction,
) => {
  const formData = new FormData();
  const file = e.currentTarget.files[0];
  // const fileSize = file && convertToMb(file.size);

  formData.append('image', file);

  for (var [key, value] of formData.entries()) { 
    console.log('formdData', key, value);
   }

  if (file) {
    uploadAction(formData, uploadResolveAction);
  }
};
