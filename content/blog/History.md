VoiceTree started out as a productivity tool for knowledge workers. It was designed to encourage a system of work called "Voice Work", where you speak your decision and problem solving process out loud. The VoiceTree would allow you to externalize your short term memory, decreasing cognitive load, thereby allowing you to stay in the flow state longer, and solve harder problems.

- Early 2024, work on VoiceTree commenced after being frustrated with the extent of context you have to manage for software engineering. It was too easy to lose track, drop the 5 balls you were juggling, and in defeat check slack. Too much time was spent figuring out what to do, not doing. 
	- Early trials of the 'Voice Work' system (saying everything you were doing out loud, code pairing, but with yourself) showed great promise, noticebly increasing productivity,


- August, 2024: Submitted a proof of concept of VoiceTree to the Gemini competition: https://ai.google.dev/competition/projects/voicetree 
	- Video demo: https://www.youtube.com/watch?v=O4ikwKYQMTE


- Early 2025, I was busy building out VoiceTree, putting all my spare time into this project.



- Mid 2025: the first breakthrough. As I started experimenting more and more with coding agents, I realised the VoiceTree system was the exact tool I was missing to better organise multiple agents in parallel, working on different parts of my codebase at once.
	- Agents localized in space, on a 2d canvas, documenting their progress on a VoiceTree are much more easy to keep track of.  
	- All the context from what you have been saying out loud becomes the prompts to run your agents on. Right click on a node, run agent, add some instructions on top. That's so much lower friction than having to type out a prompt with all your context from scratch.
	- the UI is open source on github: https://github.com/voicetreelab/voicetree-ui
	

- July 2025: the second breakthrough. If humans benefit from representing the context they are working on as an abstraction graph, would agents too? YES!
	- Store a full chat history as a VoiceTree, for any new question, give the LLM only the node summaries, and ask it what nodes it would like to have the full content of.
	- Early experiments on the [GSM-infinite](https://arxiv.org/abs/2502.05252)benchmark showed promise. On the medium difficulty datasets, agents given a VoiceTree of GSM datasets were able to read 85% less content, and still achieve the correct answer,. I was busy making my algorithm more robust to be able to handle  the 16k, and 32k token hard datasets. 
	- Started incorporating graph traversal algorithms for even less LLM calls.



The third breakthrough: LLM training data. (WIP)