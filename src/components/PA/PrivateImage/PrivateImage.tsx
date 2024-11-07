import { FC, useEffect, useState, useContext, useRef } from 'react';
import { Context } from '../../..';
import { observer } from 'mobx-react-lite';


const PrivateImage: FC<{ imageName: string }> = ({ imageName }) => {
    const [imageUrl, setImageUrl] = useState('');
    const [uploadProcess, setUploadProcess] = useState(true); 
    const { store } = useContext(Context);
    const processFetchImg = useRef<string>('');
    useEffect(() => {
        if (imageName !== 'default' && processFetchImg.current !== imageName) {
            processFetchImg.current = imageName;
            store.getPrivateImage(imageName, setImageUrl, setUploadProcess);
            return () => {
                URL.revokeObjectURL(imageUrl);
            };
        }
    }, [imageName, store, imageUrl]);
    if (imageName === 'default') return <img src="img/dafault_image/default-user.jpg" alt="default-user-avatar" />   
    if(uploadProcess) return <img src="gif/upload_image.gif" alt="upload-avatar" />
    return <img src={imageUrl} alt={imageName} />;
};

export default observer(PrivateImage);
