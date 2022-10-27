import { useEffect, useState } from 'react';

import { storage } from '../firebase/config';
import { getStorage, ref, listAll } from 'firebase/storage';

import { v4 } from 'uuid'

function Collection() {
  // Create a reference under which you want to list
  const listRef = ref(storage, 'albums/');
  const [foldersList, setFoldersList] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [imagesList, setImagesList] = useState([]);

  // Find all the prefixes and items.
  useEffect(() => {
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
          console.log(folderRef._location.path.slice(7));
          // console.log(folderRef);
          let albumFolder = folderRef._location.path
            .slice(7)
            .replaceAll('_', ' ');
          setFoldersList((prevFoldersList) => [
            ...prevFoldersList,
            albumFolder,
          ]);
        });
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          console.log(res);
        });
        //   console.log(res);
        console.log(foldersList);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  }, []);

  //   const albumRef = ref(storage, `albums/${selectedAlbum}/duze`);
  const albumRef = ref(storage, `albums/Biegam_i_wspieram/male/`);

  useEffect(() => {
    listAll(albumRef)
      .then((res) => {
        console.log('result', res);
        res.items.forEach((image) => {
          let currentImage =
            'https://firebasestorage.googleapis.com/v0/b/kacper-foto.appspot.com/o/' +
            image._location.path_.replaceAll('/', '%2F') +
            '?alt=media&token=a9586b20-d423-4ef6-807e-2ca64610af45';
          // console.log(image._location.path_)
          // console.log('imageUrl: ', 'https://firebasestorage.googleapis.com/v0/b/kacper-foto.appspot.com/o/' + image._location.path_.replaceAll('/', '%2F') + '?alt=media&token=a9586b20-d423-4ef6-807e-2ca64610af45')
          setImagesList((prevImagesList) => [...prevImagesList, currentImage]);
          //   console.log(folderRef._location.path.slice(7));
          //   let albumFolder = folderRef._location.path
          //     .slice(7)
          //     .replaceAll('_', ' ');
          //   setImagesList((prevImagesList) => [
          //     ...prevImagesList,
          //     albumFolder,
          //   ]);
        });
        // res.items.forEach((itemRef) => {
        //   console.log(res);
        // });
        // console.log(foldersList);
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  }, []);

  return (
    <div className="shop__container">
      {foldersList.map((folder) => {
        return <li>{folder}</li>;
      })}
      {imagesList.map((image) => {
        return <img key={v4()} src={image}/>;
      })}
    </div>
  );
}

export default Collection;
