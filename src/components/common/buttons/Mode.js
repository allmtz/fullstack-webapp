import { useTheme } from 'next-themes';
import Icon from '../elements/Icon';

const Mode = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <button
      onClick={() =>
        currentTheme === 'dark' ? setTheme('light') : setTheme('dark')
      }
      className="nav-item nav-item-icon"
    >
      {theme === 'dark' ? <Icon name="FiSun" /> : <Icon name="FiMoon" />}
    </button>
  );
};

export default Mode;
