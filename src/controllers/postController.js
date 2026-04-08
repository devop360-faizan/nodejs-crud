const prisma = require("../prisma");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json({
      success: true,
      message: "Posts retrieved successfully",
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post Not Found" });
    }
    res.status(200).json({
      success: true,
      message: "Post retrieved successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content, published } = req.body;
    const post = await prisma.post.create({
      data: { title, content, published },
    });
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, published } = req.body;
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, content, published },
    });
    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ success: false, message: "Post Not Found" });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.post.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    if (error.code === "P2025") {
      return res
        .status(404)
        .json({ success: false, message: "Post Not Found" });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};
