/* eslint react-hooks/rules-of-hooks: "off" */
import React from 'react'
import styled from 'styled-components';

import { uploadImage as  uploadImageHelper } from '../../helper/uploadImage'

const Input = styled.input`
`;

const index = (props) => {
  console.log('upload', props);
  const { uploadImg } = props;

  const [url, setUrl] = React.useState('');

  const changeInputHandler = (e) => {
    e.preventDefault();

    const resolve = (url) => {
      setUrl(url);
    }

    uploadImageHelper(e, uploadImg, resolve);

    // const formData = new FormData();
    // const file = e.currentTarget.files[0];

    // formData.append('image', file);


    // console.log('upload', formData, file);

    // if(file){
    //   uploadImg(formData, resolve)
    // }
  }

  return (
    <>
    {
      'url:' + url
    }
      <Input 
        type='file'
        onChange={changeInputHandler}
      />
    </>
  )
}

export default index
