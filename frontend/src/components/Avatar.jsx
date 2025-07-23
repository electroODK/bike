import defaultAvatar from "../assets/default-avatar.png";

export default function Avatar({ src, alt = "User Avatar", size = 100 }) {
  return (
    <img
      src={src}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = defaultAvatar;
      }}
      alt={alt}
      width={size}
      height={size}
      style={{
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />
  );
}
