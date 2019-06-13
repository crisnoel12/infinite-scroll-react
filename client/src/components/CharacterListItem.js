import React, { Fragment } from 'react';

const CharacterListItem = ({character: { id, name, description, thumbnail:{ path, extension} }} ) => {

  const imagePath = `${path}/portrait_xlarge.${extension}`;

  return (
    <Fragment>
      <div className="character-list-item">
        <img src={imagePath} alt={`${name}'s portrait`}/>
        <h4 className="text-pm c-name">{name}</h4>
        <p className={description === "" ? "text-orange" : null }>{description !== "" ? description : `*Missing description for ${name}`}</p>
      </div>
    </Fragment>
  );
};

export default CharacterListItem;