import type { ThemeConfig } from 'antd';

const antDesignTheme: ThemeConfig = {
  token: {
    colorPrimary: 'black',
    fontFamily: '\'Montserrat\', sans-serif',
  },
  components: {
    Button: {
      colorTextBase: 'white',
      borderRadius: 10,
      fontFamily: '\'Tektur\', sans-serif',
      borderColor: 'red',
      colorBgBase: 'black'
    },
  },
};

export default antDesignTheme;

