import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Storage,
  Query,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  plateform: "com.karim.aora",
  projectId: "6670171c00276811b10e",
  databaseId: "667020f900074fb59a68",
  userCollectionId: "6670212f0003c56e7dae",
  videoCollectionId: "6670216c0006cd9b8b68",
  storageId: "667025150004010d1bbb",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.plateform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatarkarim: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId
    );

    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getLastestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt", Query.limit(7))]
    );

    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const handleSearchResult = async (query) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search("title", query)]
    );

    return posts.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getFilePreview = async (fileId, type) => {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(config.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        config.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
};

export const uploadFile = async (file, type) => {
  if (!file) return;

  const defaultFileName = `file_${Date.now()}.${
    type === "image" ? "jpg" : "mp4"
  }`;

  const asset = {
    name: file.fileName || defaultFileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
  };

  try {
    const fileUploaded = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );

    console.log("fileUploaded:", JSON.stringify(fileUploaded, null, 2)); // Log the uploaded file object

    const fileUrl = await getFilePreview(fileUploaded.$id, type);

    console.log("filecurl: " + fileUrl);

    return fileUrl;
  } catch (error) {
    console.log("Error upload file:", error);
    throw new Error(error);
  }
};

export const createPost = async (form) => {
  console.log(form);
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    // console.log("Thumbnail URL:", JSON.stringify(thumbnailUrl, null, 2));
    // console.log("Video URL:", JSON.stringify(videoUrl, null, 2));

    // if ((!thumbnailUrl, !videoUrl)) {
    //   return;
    // }

    const newPost = await databases.createDocument(
      config.databaseId,
      config.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
