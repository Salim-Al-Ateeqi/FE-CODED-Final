import React from "react";
import { Heading, HStack } from "native-base";
import { observer } from "mobx-react";

const NameHeader = ({ group }) => {
	return <Heading fontSize={18}>{group.name}</Heading>;
};

export default observer(NameHeader);
