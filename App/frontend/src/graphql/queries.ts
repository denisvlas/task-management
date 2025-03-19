import { gql } from "urql"; // or import from 'graphql-tag' if you're using that

export const login = gql`
  query login($username: String!, $password: String!, $projectId: Int!) {
    users(
      where: {
        username: { _eq: $username }
        password: { _eq: $password }
        project_id: { _eq: $projectId }
      }
    ) {
      id
      username
      project_id
    }
  }
`;
export const getTasks = gql`
  query getTasks($projectId: Int!) {
    tasks(where: { project_id: { _eq: $projectId } }) {
      id
      title
      status
      description
      comment
      user_id
      project_id
    }
  }
`;

export const getUsers = gql`
  query getUsers($userName: String, $project_id: Int) {
    users(
      where: { username: { _eq: $userName }, project_id: { _eq: $project_id } }
    ) {
      id
    }
  }
`;

export const getProjectUsers = gql`
  query getProjectUsers($projectId: Int!) {
    users(where: { project_id: { _eq: $projectId } }) {
      id
      username
      project_id
    }
  }
`;

export const getProjects = gql`
  query getProjects {
    projects {
      project_id
      name
      img
    }
  }
`;

export const deleteAllTasks = gql`
  mutation deleteAllTasks($projectId: Int!) {
    delete_tasks(where: { project_id: { _eq: $projectId } }) {
      affected_rows
    }
  }
`;

export const getLastTaskId = gql`
  query getLastTaskId {
    tasks(order_by: { id: desc }, limit: 1) {
      id
    }
  }
`;

export const deleteTask = gql`
  mutation deleteTask($taskId: Int!) {
    delete_tasks(where: { id: { _eq: $taskId } }) {
      affected_rows
    }
  }
`;

export const addTask = gql`
  mutation addTask(
    $title: String!
    $status: String!
    $description: String
    $comment: String
    $userId: Int!
    $projectId: Int!
  ) {
    insert_tasks(
      objects: {
        title: $title
        status: $status
        description: $description
        comment: $comment
        user_id: $userId
        project_id: $projectId
      }
    ) {
      affected_rows
    }
  }
`;

export const updateTask = gql`
  mutation updateTask(
    $taskId: Int!
    $title: String
    $status: String
    $description: String
    $comment: String
    $userId: Int
  ) {
    update_tasks(
      where: { id: { _eq: $taskId } }
      _set: {
        title: $title
        status: $status
        description: $description
        comment: $comment
        user_id: $userId
      }
    ) {
      affected_rows
    }
  }
`;

export const getUserId = gql`
  query getUserId($username: String!, $projectId: Int!) {
    users(
      where: { username: { _eq: $username }, project_id: { _eq: $projectId } }
    ) {
      id
    }
  }
`;

export const addProject = gql`
  mutation addProject($name: String!, $img: String!) {
    insert_projects(objects: { name: $name, img: $img }) {
      affected_rows
    }
  }
`;

export const registerUser = gql`
  mutation registerUser(
    $username: String!
    $password: String!
    $projectId: Int!
  ) {
    insert_users(
      objects: {
        username: $username
        password: $password
        project_id: $projectId
      }
    ) {
      affected_rows
      returning {
        id
        username
      }
    }
  }
`;

export const getCurrentUser = gql`
  query getCurrentUser($username: String!) {
    users(where: { username: { _eq: $username } }) {
      id
      username
      project_id
    }
  }
`;
