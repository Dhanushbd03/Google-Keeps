const Profile = ({ picture, name }) => {
  return (
    <div className="profile-data">
      <img src={picture} alt={name} />
      <p>{name}</p>
    </div>
  );
};

export default Profile;
