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
    },
  ],

  products: [
    {
      // BIEGI
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

    //EMOCJE
    {
      description: 'Emocje',
      imageLarge: '../assets/portfolio/emocje/0.jpg',
      imageMedium: '../assets/portfolio/emocje/0.jpg',
      imageSmall: '../assets/portfolio/emocje/0.jpg',
      album: 'Emocje',
      eventDate: '18.02.2022',
      eventType: 'Emocje',
      eventName: 'Porftolio album',
      price: 10,
      numDownloads: 0,
    },
    {
      description: 'Emocje',
      imageLarge: '../assets/portfolio/emocje/1.jpg',
      imageMedium: '../assets/portfolio/emocje/1.jpg',
      imageSmall: '../assets/portfolio/emocje/1.jpg',
      album: 'Emocje',
      eventDate: '18.02.2022',
      eventType: 'Emocje',
      eventName: 'Porftolio album',
      price: 10,
      numDownloads: 0,
    },
    {
      description: 'Emocje',
      imageLarge: '../assets/portfolio/emocje/2.jpg',
      imageMedium: '../assets/portfolio/emocje/2.jpg',
      imageSmall: '../assets/portfolio/emocje/2.jpg',
      album: 'Emocje',
      eventDate: '18.02.2022',
      eventType: 'Emocje',
      eventName: 'Porftolio album',
      price: 10,
      numDownloads: 0,
    },
    {
      description: 'Emocje',
      imageLarge: '../assets/portfolio/emocje/3.jpg',
      imageMedium: '../assets/portfolio/emocje/3.jpg',
      imageSmall: '../assets/portfolio/emocje/3.jpg',
      album: 'Emocje',
      eventDate: '18.02.2022',
      eventType: 'Emocje',
      eventName: 'Porftolio album',
      price: 10,
      numDownloads: 0,
    },

    //PORTRET
    {
      description: 'Portret',
      imageLarge: '../assets/portfolio/portret/0.jpg',
      imageMedium: '../assets/portfolio/portret/0.jpg',
      imageSmall: '../assets/portfolio/portret/0.jpg',
      album: 'Portret',
      eventDate: '11.09.2019',
      eventType: 'Portret',
      eventName: 'Porftolio album',
      price: 10,
      numDownloads: 0,
    },
    {
      description: 'Portret',
      imageLarge: '../assets/portfolio/portret/1.jpg',
      imageMedium: '../assets/portfolio/portret/1.jpg',
      imageSmall: '../assets/portfolio/portret/1.jpg',
      album: 'Portret',
      eventDate: '11.09.2019',
      eventType: 'Portret',
      eventName: 'Porftolio album',
      price: 10,
      numDownloads: 0,
    },
    {
      description: 'Portret',
      imageLarge: '../assets/portfolio/portret/2.jpg',
      imageMedium: '../assets/portfolio/portret/2.jpg',
      imageSmall: '../assets/portfolio/portret/2.jpg',
      album: 'Portret',
      eventDate: '11.09.2019',
      eventType: 'Portret',
      eventName: 'Porftolio album',
      price: 10,
      numDownloads: 0,
    },
    {
      description: 'Portret',
      imageLarge: '../assets/portfolio/portret/3.jpg',
      imageMedium: '../assets/portfolio/portret/3.jpg',
      imageSmall: '../assets/portfolio/portret/3.jpg',
      album: 'Portret',
      eventDate: '11.09.2019',
      eventType: 'Portret',
      eventName: 'Porftolio album',
      price: 10,
      numDownloads: 0,
    },

    //KRAJOBRAZ
    {
      description: 'Krajobraz',
      imageLarge: '../assets/portfolio/krajobraz/0.jpg',
      imageMedium: '../assets/portfolio/krajobraz/0.jpg',
      imageSmall: '../assets/portfolio/krajobraz/0.jpg',
      album: 'Krajobraz',
      eventDate: '14.08.2019',
      eventType: 'Krajobraz',
      eventName: 'Krajobraz',
      price: 10,
      numDownloads: 0,
    },
    {
      description: 'Krajobraz',
      imageLarge: '../assets/portfolio/krajobraz/1.jpg',
      imageMedium: '../assets/portfolio/krajobraz/1.jpg',
      imageSmall: '../assets/portfolio/krajobraz/1.jpg',
      album: 'Krajobraz',
      eventDate: '14.08.2019',
      eventType: 'Krajobraz',
      eventName: 'Krajobraz',
      price: 10,
      numDownloads: 0,
    },
    {
      description: 'Krajobraz',
      imageLarge: '../assets/portfolio/krajobraz/2.jpg',
      imageMedium: '../assets/portfolio/krajobraz/2.jpg',
      imageSmall: '../assets/portfolio/krajobraz/2.jpg',
      album: 'Krajobraz',
      eventDate: '14.08.2019',
      eventType: 'Krajobraz',
      eventName: 'Krajobraz',
      price: 10,
      numDownloads: 0,
    },
    {
      description: 'Krajobraz',
      imageLarge: '../assets/portfolio/krajobraz/3.jpg',
      imageMedium: '../assets/portfolio/krajobraz/3.jpg',
      imageSmall: '../assets/portfolio/krajobraz/3.jpg',
      album: 'Krajobraz',
      eventDate: '14.08.2019',
      eventType: 'Krajobraz',
      eventName: 'Krajobraz',
      price: 10,
      numDownloads: 0,
    },
    {
      description: 'Krajobraz',
      imageLarge: '../assets/portfolio/krajobraz/4.jpg',
      imageMedium: '../assets/portfolio/krajobraz/4.jpg',
      imageSmall: '../assets/portfolio/krajobraz/4.jpg',
      album: 'Krajobraz',
      eventDate: '14.08.2019',
      eventType: 'Krajobraz',
      eventName: 'Krajobraz',
      price: 10,
      numDownloads: 0,
    },
    {
      description: 'Krajobraz',
      imageLarge: '../assets/portfolio/krajobraz/5.jpg',
      imageMedium: '../assets/portfolio/krajobraz/5.jpg',
      imageSmall: '../assets/portfolio/krajobraz/5.jpg',
      album: 'Krajobraz',
      eventDate: '14.08.2019',
      eventType: 'Krajobraz',
      eventName: 'Krajobraz',
      price: 10,
      numDownloads: 0,
    },
    {
      description: 'Krajobraz',
      imageLarge: '../assets/portfolio/krajobraz/6.jpg',
      imageMedium: '../assets/portfolio/krajobraz/6.jpg',
      imageSmall: '../assets/portfolio/krajobraz/6.jpg',
      album: 'Krajobraz',
      eventDate: '14.08.2019',
      eventType: 'Krajobraz',
      eventName: 'Krajobraz',
      price: 10,
      numDownloads: 0,
    },

    //INNE
    {
      description: 'Inne',
      imageLarge: '../assets/portfolio/inne/0.jpg',
      imageMedium: '../assets/portfolio/inne/0.jpg',
      imageSmall: '../assets/portfolio/inne/0.jpg',
      album: 'Inne',
      eventDate: '14.08.2019',
      eventType: 'Inne',
      eventName: 'Inne',
      price: 10,
      numDownloads: 0,
    },
    {
      description: 'Inne',
      imageLarge: '../assets/portfolio/inne/1.jpg',
      imageMedium: '../assets/portfolio/inne/1.jpg',
      imageSmall: '../assets/portfolio/inne/1.jpg',
      album: 'Inne',
      eventDate: '14.08.2019',
      eventType: 'Inne',
      eventName: 'Inne',
      price: 10,
      numDownloads: 0,
    },
    {
      description: 'Inne',
      imageLarge: '../assets/portfolio/inne/2.jpg',
      imageMedium: '../assets/portfolio/inne/2.jpg',
      imageSmall: '../assets/portfolio/inne/2.jpg',
      album: 'Inne',
      eventDate: '14.08.2019',
      eventType: 'Inne',
      eventName: 'Inne',
      price: 10,
      numDownloads: 0,
    },
    {
      description: 'Inne',
      imageLarge: '../assets/portfolio/inne/3.jpg',
      imageMedium: '../assets/portfolio/inne/3.jpg',
      imageSmall: '../assets/portfolio/inne/3.jpg',
      album: 'Inne',
      eventDate: '14.08.2019',
      eventType: 'Inne',
      eventName: 'Inne',
      price: 10,
      numDownloads: 0,
    },
    {
      description: 'Inne',
      imageLarge: '../assets/portfolio/inne/4.jpg',
      imageMedium: '../assets/portfolio/inne/4.jpg',
      imageSmall: '../assets/portfolio/inne/4.jpg',
      album: 'Inne',
      eventDate: '14.08.2019',
      eventType: 'Inne',
      eventName: 'Inne',
      price: 10,
      numDownloads: 0,
    },
    {
      description: 'Inne',
      imageLarge: '../assets/portfolio/inne/5.jpg',
      imageMedium: '../assets/portfolio/inne/5.jpg',
      imageSmall: '../assets/portfolio/inne/5.jpg',
      album: 'Inne',
      eventDate: '14.08.2019',
      eventType: 'Inne',
      eventName: 'Inne',
      price: 10,
      numDownloads: 0,
    },



    // ../assets/portfolio/top/0.jpg
    // "../assets/portfolio/biegi/1.jpg"
    // "../assets/portfolio/emocje/2.jpg"
    // "../assets/portfolio/portret/0.jpg"
    // "../assets/portfolio/krajobraz/5.jpg"
    // "../assets/portfolio/inne/4.jpg"
  ],
};

export default data;