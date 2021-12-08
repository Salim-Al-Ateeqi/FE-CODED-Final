import React from "react";
import { View, Text } from "react-native";
import groupStore from "../../stores/groupStore";
import ImagePicker from "expo-image-picker";

const EditGroup = ({ route, navigation }) => {
  const { group } = route.params;

  const [grroup, setGroup] = useState({
    name: group.name,
    image: group.image,
  });

  const toast = useToast();

  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        const localUri = result.uri;
        const filename = localUri.split("/").pop();
        const match = /.(\w+)$/.exec(filename);
        const image = {
          uri: localUri,
          name: filename,
          type: match ? `image/${match[1]}` : image,
        };
        setGroup({ ...grroup, image: image });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    groupStore.updateGroup(group._id, grroup, navigation, toast);
  };
  return (
    <View>
      <FormControl>
        <FormControl.Label>Updated Group Name:</FormControl.Label>

        <Input
          onChangeText={(title) => setGroup({ ...grroup, title })}
          placeholder="Please enter a new group name!"
        />
      </FormControl>
      <FormControl>
        <FormControl.Label>Choose An Image to Upload</FormControl.Label>
        <Button
          title="Pick an image from camera roll"
          onPress={_pickImage}
          variant="outline"
          colorScheme="success"
        >
          Upload Image
        </Button>
      </FormControl>

      <FormControl>
        <FormControl.Label>Updated Description:</FormControl.Label>
        <Input
          onChangeText={(description) => setGroup({ ...grroup, description })}
          placeholder="Please enter a new group description!"
        />
      </FormControl>
      <Button
        mt="2"
        colorScheme="indigo"
        onPress={handleUpdate}
        variant="outline"
      >
        Update Group
      </Button>
    </View>
  );
};

export default EditGroup;
