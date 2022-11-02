import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { storage } from '../firebase/config';
import { ref, listAll } from 'firebase/storage';

import { v4 } from 'uuid';

//components
import AlbumCard from '../components/AlbumCard';

function Collection() {
  // Create a reference under which you want to list
  const listRef = ref(storage, 'albums/');
  const [foldersList, setFoldersList] = useState([]);
  // const [selectedAlbum, setSelectedAlbum] = useState('');
  // const [imagesList, setImagesList] = useState([]);

  // Find all the prefixes and items.
  useEffect(() => {
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
          //   console.log(folderRef._location.path.slice(7));
          console.log('folderRef', folderRef._location.path);
          let albumName = folderRef._location.path
            .slice(7)
            .replaceAll('_', ' ');

          // console.log('cover image',`https://firebasestorage.googleapis.com/v0/b/kacper-foto.appspot.com/o/albums%2F${folderRef._location.path
          // .slice(7)}%2Fmale%2Fcover.jpg?alt=media&amp;token=a9586b20-d423-4ef6-807e-2ca64610af45`)
          setFoldersList((prevFoldersList) => [
            ...prevFoldersList,
            // albumFolder,
            {
              albumName,
              coverImage: `https://firebasestorage.googleapis.com/v0/b/kacper-foto.appspot.com/o/albums%2F${folderRef._location.path.slice(
                7
              )}%2Fmale%2Fcover.jpg?alt=media&amp;token=a9586b20-d423-4ef6-807e-2ca64610af45`,
            },
          ]);
        });
        res.items.forEach((itemRef) => {
          // All the items under listRef.
          console.log('res', itemRef);
        });
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Sklep</title>
      </Helmet>
      <div className="shop__container">
        <h1>Przeglądaj wydarzenia:</h1>
        <div className="shop__cards">
          {foldersList.map((folder) => {
            return (
              <li key={v4()}>
                <AlbumCard
                  image={folder.coverImage}
                  collection={folder.albumName}
                />
                {folder.albumName}
              </li>
            );
          })}
        </div>
        {/* {imagesList.map((image) => {
        return <img key={v4()} src={image} />;
      })} */}
      </div>
    </>
  );
}

export default Collection;
