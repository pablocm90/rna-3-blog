import React, { useContext } from 'react';
import { StyleSheet} from 'react-native'
import { Context } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';




const EditScreen = ({ navigation }) => {
  const id = navigation.getParam('id');
  const { state } = useContext(Context);
  const blogPost = state.find((blogPost) => blogPost.id === id);

  const { editBlogPost } = useContext(Context);


  return (
    <BlogPostForm
      initialValues={{title: blogPost.title, content: blogPost.content}}
      onSubmit={(title, content) => {
        editBlogPost(title, content, id, () => navigation.pop())
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default EditScreen
