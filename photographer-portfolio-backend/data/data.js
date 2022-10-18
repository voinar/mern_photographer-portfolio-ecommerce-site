import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'admin',
      email: 'nifeprty@gmail.com',
      password: bcrypt.hashSync('admin'),
      isAdmin: true,
    },
    {
      name: 'marcin',
      email: 'mpwojnar@gmail.com',
      password: bcrypt.hashSync('user'),
      isAdmin: false,
    }
  ],

  products: [
    {
      description:
        'Kwintesencja Trail Runningu, Wbiegnij na PODIUM z Buty Jana 2022',
      imageLarge: '../assets/portfolio/biegi/0.jpg',
      imageMedium: '../assets/portfolio/biegi/0.jpg',
      imageSmall: '../assets/portfolio/biegi/0.jpg',
      album: 'Wbiegnij na PODIUM z Buty Jana 2022',
      eventDate: '11.11.2022',
      eventType: 'Biegi',
      eventName: 'Buty Jana 2022',
      price: 10,
      numDownloads: 0,
    },
    {
      description:
        'Kwintesencja Trail Runningu, Wbiegnij na PODIUM z Buty Jana 2022',
      imageLarge: '../assets/portfolio/biegi/1.jpg',
      imageMedium: '../assets/portfolio/biegi/1.jpg',
      imageSmall: '../assets/portfolio/biegi/1.jpg',
      album: 'Wbiegnij na PODIUM z Buty Jana 2022',
      eventDate: '14.02.2022',
      eventType: 'Biegi',
      eventName: 'Buty Jana 2022',
      price: 10,
      numDownloads: 0,
    },
  ],
};

export default data;
