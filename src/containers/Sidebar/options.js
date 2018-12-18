const options = [
  // {
  //   key: 'blankPage',
  //   label: 'sidebar.blankPage',
  //   leftIcon: 'ion-document',
  // },
  // {
  //   key: 'authCheck',
  //   label: 'sidebar.authCheck',
  //   leftIcon: 'ion-document',
  // },
  {
    key: 'firestorecrud',
    label: 'sidebar.firestorecrud',
    leftIcon: 'ion-fireball',

    children: [
      {
        key: 'articles',
        label: 'sidebar.firestorecrudarticle',
      },
      {
        key: 'investors',
        label: 'sidebar.firestorecrudinvestor',
      },
    ],
  },
];
export default options;
