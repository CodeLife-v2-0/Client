import { FC, useState, Dispatch, SetStateAction, useEffect, ReactNode, useContext } from 'react';
import styles from './SideMenu.module.css';
import { IUser } from '../../../models/IUser';
import PrivateImage from '../PrivateImage/PrivateImage';
import { observer } from 'mobx-react-lite';
import { asideMenu } from '../../../localizationData';
import { Context } from '../../..';


interface ISideMenu {
  userData: IUser;
  editingAvatar: () => void;
  avatarUrl: string;
  setActiveContentCategory: Dispatch<SetStateAction<number>>
  editingMode: boolean;
  mode: string;
}

const SideMenu: FC<ISideMenu> = ({
  userData,
  editingAvatar,
  avatarUrl,
  setActiveContentCategory,
  editingMode,
  mode
}) => {

  const [isVisible, setIsVisible] = useState(false);

  const [avatar, setAvatar] = useState<ReactNode | null>(null);

  useEffect(() => {
    setAvatar(<PrivateImage imageName={avatarUrl} />)
  }, [avatarUrl])

  const { store } = useContext(Context);


  return (
    <nav className={styles.wrapper_navigation}>
      <div className={styles.avatar_block}
        onMouseEnter={() => {
          if (!editingMode) {
            setIsVisible(true)
          }
        }}
        onMouseLeave={() => setIsVisible(false)}
      >
        {avatar}
        <div
          className={styles.refresh_photo}
          style={{
            opacity: isVisible ? '0.6' : '0',
            cursor: editingMode ? 'var(--cursorDefault, default)' : 'pointer'
          }}
          onClick={() => {
            if (!editingMode) {
              editingAvatar()
            }
          }}
        >
          {asideMenu.changePhoto[store.isEng]}
        </div>
      </div>
      <span className={styles.user_full_name}>{userData.name} {userData.surName}</span>
      {(mode === 'user' ? asideMenu.menuItems[store.isEng] : asideMenu.menuItemsAdmin[store.isEng]).map((textItem, index) => (
        <span
          key={index}
          style={{ cursor: 'pointer' }}
          onClick={() => { setActiveContentCategory(index + asideMenu.menuItems[store.isEng].length * Number(mode !== 'user')); }}
        >
          {textItem}
        </span>
      ))}
    </nav>
  );
};

export default observer(SideMenu);