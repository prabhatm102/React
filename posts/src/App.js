import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import http from "./services/httpServices";
import config from "./config.json";
import { toast, ToastContainer } from "react-toastify";

export default class App extends Component {
  state = {
    posts: [],
  };
  async componentDidMount() {
    const { data: posts } = await http.get(config.apiEndpoint);
    this.setState({ posts });
  }
  handleAdd = async () => {
    const obj = { title: "new post", body: "b" };
    const { data: post } = await http.post(config.apiEndpoint, obj);
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };
  handleUpdate = async (post) => {
    post.title = "Update Title";
    await http.put(config.apiEndpoint + "/" + post.id, post);
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };
  handleDelete = async (post) => {
    const originalPosts = [...this.state.posts];
    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });
    try {
      await http.delete(config.apiEndpoint + post.id);
      // throw new Error(" ");
    } catch (ex) {
      // Expected Error: 404:not-found,400:bad request --->client error
      // Unexpected Error:  network or server or db down,bug  --->Log them and display generic and friendly error message

      if (ex.response && ex.response.status === 404)
        toast("This post has already been deleted!");

      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <div className="container-fluid my-3">
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => {
              return (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => this.handleUpdate(post)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.handleDelete(post)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
