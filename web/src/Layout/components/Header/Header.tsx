import React from 'react';
import { Button, Segment } from 'semantic-ui-react';
type Props = {
  setSideVisible: () => void;
};
const Header = ({ setSideVisible }: Props) => {
  return (
    <Segment>
      <Button content="visible" onClick={() => setSideVisible()}></Button>
    </Segment>
  );
};

export default Header;
