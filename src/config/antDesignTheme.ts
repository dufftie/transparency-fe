import type { ThemeConfig } from 'antd';

const antDesignTheme: ThemeConfig = {
  token: {
    colorPrimary: '#F5D6BB',
    fontFamily: "'Montserrat', sans-serif",
  },
  components: {
    Button: {
      colorTextBase: 'white',
      borderRadius: 10,
      fontFamily: "'Tektur', sans-serif",
      borderColor: 'red',
    },
  },
};

export default antDesignTheme;
