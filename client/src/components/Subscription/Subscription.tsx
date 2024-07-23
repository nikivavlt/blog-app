import React from 'react';

const Subscription = (): JSX.Element => {
  return (
    <div>Subscription form ? - Different name
      <form>
        <label htmlFor="text">Text:</label>
        <input type="text" id="text" name="Text"/>
      </form>
    </div>
  );
};

export default Subscription;
