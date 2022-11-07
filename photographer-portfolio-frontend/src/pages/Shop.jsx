import { useEffect, useState, Helmet, AlbumCard, v4 } from '../imports';


import { storage } from '../firebase/config';
import { ref, listAll } from 'firebase/storage';

function Collection() {
  // Create a reference under which you want to list
  const [foldersList, setFoldersList] = useState([]);

  // Find all the prefixes and items.
  useEffect(() => {
    const listAlbums = () => {
      const listRef = ref(storage, 'albums/');
      listAll(listRef)
        .then((res) => {
          res.prefixes.forEach((folderRef) => {
            let albumName = folderRef._location.path
              .slice(7)
              .replaceAll('_', ' ');

            setFoldersList((prevFoldersList) => [
              ...prevFoldersList,
              {
                albumName,
                coverImage: `https://firebasestorage.googleapis.com/v0/b/kacper-foto.appspot.com/o/albums%2F${folderRef._location.path.slice(
                  7
                )}%2Fmale%2Fcover.jpg?alt=media&amp;token=a9586b20-d423-4ef6-807e-2ca64610af45`,
              },
            ]);
          });
        })
        .catch((error) => {
          console.log('error', error);
        });
    };
    listAlbums();
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
      </div>
    </>
  );
}

export default Collection;
