import Link from 'next/link';
import { useEffect, useState } from 'react';
import { checkIfUserOnline } from 'firebase/firebasePresence';
import Image from 'next/future/image';

const avatarSize = 'h-11 w-11 sm:h-14 sm:w-14';
const avatarWidth = 100;
const avatarHeight = 100;

const ProfileImage = ({ src, setSrc, width, height, name }) => {
  return (
    <Image
      src={src}
      className="h-full w-full object-cover"
      alt={name}
      title={name}
      referrerPolicy="no-referrer"
      width={width}
      height={height}
      layout="fill"
      onError={() => setSrc('/assets/profile/user/avatar-notfound.webp')}
    />
  );
};

const Avatar = (props) => {
  const [imgSrc, setImgSrc] = useState(props?.image);
  const [isOnline, setIsOnline] = useState(false);
  if (props.userId) checkIfUserOnline(props.userId, setIsOnline);

  let dimensions = avatarSize;
  if (props.dimensions) dimensions = props.dimensions;

  let width = avatarWidth;
  if (props.width) width = props.width;

  let height = avatarHeight;
  if (props.height) height = props.height;

  useEffect(() => {
    setImgSrc(props?.image);
  }, [props]);

  return (
    <div className="relative cursor-pointer">
      {props.href ? (
        <Link href={`${props.href}`} passHref>
          <div
            className={`${dimensions} overflow-hidden rounded-full duration-200 hover:ring-4 hover:ring-purple-500`}
          >
            <ProfileImage
              src={
                imgSrc ? imgSrc : '/assets/profile/user/avatar-notfound.webp'
              }
              setSrc={setImgSrc}
              width={width}
              height={height}
              name={props.name}
            />
          </div>
        </Link>
      ) : (
        <div className={`${dimensions} overflow-hidden rounded-full`}>
          <ProfileImage
            src={imgSrc ? imgSrc : '/assets/profile/user/avatar-notfound.webp'}
            setSrc={setImgSrc}
            width={width}
            height={height}
            name={props.name}
          />
        </div>
      )}
      {props.userId && isOnline && (
        <div className="absolute -bottom-1 right-0 flex w-full justify-end">
          <div className="w-1/3">
            <span
              className="flex h-3 w-3 rounded-full bg-green-500 ring-0"
              title="Online"
            ></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
