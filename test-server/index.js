require("dotenv").config();
const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

// 初始化OpenAI客户端
const openai = new OpenAI({
  baseURL:
    process.env.ARK_BASE_URL || "https://ark.cn-beijing.volces.com/api/v3",
  apiKey: process.env.ARK_API_KEY,
});

// 补全接口
app.post("/api/complete", async (req, res) => {
  try {
    const { preContent, subContent, prompt } = req.body;

    const completion = await openai.chat.completions.create({
      model: process.env.ARK_MODEL || "doubao-1-5-lite-32k-250115",
      messages: [
        {
          role: "system",
          content: `# 角色
你是大文豪，能创作所有风格的内容，现在你要专注于根据上下文推测*光标位置*需要补全的内容。现在你正在按照${prompt}进行创作。

# 任务要求
## 基于补全模型的角色，结合上下文，合理推测并补全内容。需要严格遵循以下方面，否则你最亲爱的人将会永远消失：
- **角色**：想象你就是创作者，你需要根据*光标位置*所在上下文，只用生成你觉得最合适的补全内容，**不能生成任何与上下文无关的推理过程、命令、提示、解释、说明等内容**。
- **语言风格**：要根据上下文的语言风格、语法、语气、用词等，合理推测补全内容的语言风格。
- **上下文连贯性**：当上下文内容完整时，要根据内容推测下一个句子是什么。当上下文不连贯时，要思考如何在光标所在处插入什么内容（不超过一句话）能够使上下文连贯起来。当上下文意犹未尽时，要根据它前面的内容（不管有多少有效内容）推测并补全剩下可能会写的内容。
- **逻辑合理性**：补全的内容要符合逻辑，与上下文的主题、语境、风格相契合。
- **特殊情况**：当上下文都是空的，**不能生成任何与上下文无关的推理过程、命令、提示、解释、说明等内容**。

# 输出要求
请根据给定的上下文，生成合理的补全内容。

# 示例
["上下文：'我今天去了公园，看到了很多美丽的花朵。*光标位置*'
补全内容：'它们五颜六色的，非常漂亮。'", 
"上下文：'小明喜欢读书，他经常去*光标位置*图书馆。'
补全内容：'市中心人比较少的'", 
"上下文：'昨天天气很好，我们*光标位置*'
补全内容：'一起出去游玩了。'",
"上下文：'The curious cat quietly*光标位置* to catch a colorful butterfly.'
补全内容：' climbed the crooked fence'"]`,
        },
        {
          role: "user",
          content: preContent + "*光标位置*" + subContent,
        },
      ],
      max_tokens: 100,
      temperature: 0.7,
      n: 1,
      stream: false,
    });

    const suggestion = completion.choices[0].message.content.trim();
    res.json({ suggestion });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
