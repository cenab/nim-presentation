# Network Identity Management (NIM) - Conversational Presentation Script

*A fluent, engaging speaker script for academic conference presentation (≈ 10–12 min)*

---

### **1 · Title – Network Identity Management**

"Good morning, everyone. I'm Batu Bora, and I'm excited to share our research on **Network Identity Management**—or **NIM**—and how it can help us make sense of what's happening in today's increasingly opaque networks."

*(Pause naturally as logos appear, making eye contact with the audience.)*

"Thank you all for being here. I know there are many compelling sessions today, so I appreciate you choosing to spend the next few minutes with us."

---

### **2 · The Security Challenge**

"Let's begin with a challenge common to modern enterprise networks. Our enterprise networks have essentially become black boxes to us, and frankly, it's becoming a real problem."

"Think about what we're dealing with: Universal encryption – which is fantastic for privacy, don't get me wrong – but it completely neutralizes our traditional deep-packet inspection tools. Meanwhile, our firewalls are still stuck speaking the language of IPs and ports when what we really need to understand is applications and user intent."

"BYOD floods the network with unmanaged personal devices, creating a hard trade-off between privacy and visibility."

---

### **3 · Research Question & Approach**

"This led us to ask a fundamental question that often arises in network security circles:"

> *How can we regain meaningful visibility into encrypted BYOD traffic without compromising the very privacy and encryption that we're trying to protect?*

"Now, here's where it gets interesting. Instead of trying to break or bypass encryption – which would be both ethically problematic and technically challenging – we decided to look at what's hiding in plain sight: the metadata."

"We realized that metadata carries incredibly rich signals about application behavior, device characteristics, and even user actions. So we developed machine learning models that can identify not just what application is being used, but which device is running it and what the user is actually doing – all while leaving the encrypted payload completely untouched."

---

### **4 · NIM Framework**

"Let me walk you through our **NIM** framework, which rests on four key pillars that work together to solve this puzzle."

"First, we built a **cloud-native traffic generation** system that creates realistic, large-scale data without any privacy concerns. Second, we developed **dynamic isolation** techniques that can keep each application's flows separate even when IP addresses are constantly changing – as they do in the real world."

"Third, we focused on **environment-agnostic features** – characteristics that capture stable behavioral patterns rather than site-specific quirks that wouldn't generalize. And finally, we layer on machine learning that gives us what we call **identity-aware visibility**."

"What does that look like in practice? Well, imagine your network monitoring system telling you: 'User A is on Signal, having a group chat conversation from Device 42.' That's the kind of granular, actionable intelligence we're talking about."

---

### **5 · Key Contributions**

"Now, let me highlight what we think are the three main contributions of this work, because I believe each one addresses a real gap in our current capabilities."

"First, we've developed an ML pipeline that pushes encrypted traffic analysis beyond simple application identification. We can actually detect specific user actions – something that hasn't been demonstrated at this level before."

"Second, we've created a fully synthetic, cloud-native traffic generator that eliminates privacy risks entirely. No real user data, no ethical concerns, but still realistic enough to train robust models."

"And third – and this is something I'm particularly excited about – we've incorporated behavioral simulation that trains our models on how humans actually communicate, not just abstract packet patterns. This makes our approach much more realistic and applicable to real-world scenarios."

---

### **6 · Experimental Steps (Roadmap)**

"Let me take you through our experimental approach, which we designed as a three-stage process to systematically build and validate our solution."

"Stage one: Generate realistic traffic using what we call a scalable click-farm emulator. Stage two: Isolate individual application flows using a combination of port timing analysis, TLS-SNI inspection, and IPs. And stage three: Build and evaluate our ML pipeline with careful feature selection and cross-validation."

---

### **7 · Traffic Generation System**

"Now, here's where things get interesting from a technical standpoint. We used Google Cloud's **Cuttlefish** platform to run three virtual Android devices simultaneously for 37 hours straight."

"The dialogue fires every 15 to 60 seconds, creating natural conversation rhythms. We capture everything with **tcpdump** and then parse it using **Tranalyzer2** for detailed flow analysis."

*(Gesture toward the dialogue table if visible)*

"You can see some examples of the dialogue patterns we used – it's surprisingly effective at creating realistic traffic signatures."

---

### **8 · Traffic Generation Video**

"I want to show you a quick clip of this system in action. What you're seeing here is essentially an automated hardware 'click farm,' but one that produces authentic-looking messaging traffic. We are doing what you are seeing here over the cloud instead of using physical hardware."

*(Set up the video naturally)*

---

### **10 · Traffic Pre-processing Pipeline**

"Once we capture the raw traffic, it goes through a three-stage filtering process that's crucial for getting clean, analyzable data."

"First, we use **time-bounded correlation** to group packet bursts that belong to the same communication session. Then we apply **TLS-SNI inspection** to anchor flows to specific domains – this helps us confirm which application we're actually looking at."

"Finally, we run **IP-range validation** as a sanity check to make sure we're not picking up any stray traffic. Only the clean, application-specific flows make it through to our ML pipeline."

"This preprocessing is critical because garbage in, garbage out – we need high-quality, well-labeled data for our models to learn effectively."

---

### **11 · ML Model – App & Device**

"Now we get to the heart of our approach: the machine learning models. For **application and device identification**, we use a **multi-output Gradient Boosting** model, and the results have been quite encouraging."

"From 109 raw features we keep only the strongest few—metrics like `tcpMSS` and burst timing—selected via **ANOVA F-value**."

"We validate everything with **ten-fold cross-validation** to make sure our results are robust and not just overfitting to our particular dataset. The model achieves **98 to 99 percent F1 scores** for application identification and essentially **perfect accuracy** for device identification."

"What's particularly satisfying is that these results hold up across different validation folds, which gives us confidence that the approach will generalize."

---

### **12 · ML Model – User Action**

"The really exciting part, though, is when we tackle **user action classification** – specifically, can we tell the difference between group chat and one-on-one conversations just from the encrypted traffic patterns?"

"We use a binary Gradient Boosting classifier for this, and while the overall F1 score is **73 percent**, the performance varies quite a bit across different messaging platforms. Discord and Telegram work beautifully – we can classify their conversation types with high accuracy. Signal, on the other hand, remains more challenging."

"But here's the key insight: the fact that we can do this at all demonstrates that user actions do embed distinct, learnable signatures in the metadata."

---

### **13 · ML Architecture Diagram**

"This diagram summarizes our complete ML architecture. You can see how we have shared feature extraction feeding into two separate branches – one multi-output path for application and device classification, and a binary path for action classification."

"The elegant thing about this design is that both tasks benefit from the same underlying feature representation, but we can optimize each branch for its specific classification challenge."

---

### **14 · Performance Results**

"Let me give you the key performance numbers that really tell the story of what we've achieved."

"We're seeing **98.6 percent F1** for application classification – that's essentially production-ready accuracy. Device identification is **near-perfect** as well, largely because each handset's network stack leaves a stable low-level fingerprint—features like TCP MSS, initial window size, and IP-ID patterns—that our model can latch onto."

"For user action classification, we achieve **73 percent overall**, but here's what's really interesting – on Discord specifically, we hit **90 percent**. This suggests that with more platform-specific tuning, we could push these numbers even higher."

"Across all tasks, Gradient Boosting consistently outperformed Random Forest, Decision Trees, SVM, and Naïve Bayes. It seems particularly well-suited to capturing the complex, non-linear patterns in network traffic metadata."

---

### **15 · NIM Concept**

"So how does this all come together operationally? The **NIM** concept feeds our classified metadata into a policy engine that enables **role-based access control** for encrypted applications."

"Think of it as extending **Zero Trust** principles to the application layer, but without requiring any decryption. You can make intelligent policy decisions based on who is using what application to do what kind of activity – all while preserving the encryption that protects user privacy."

"This gives network administrators the visibility they need for security and compliance without compromising the privacy guarantees that users rightfully expect."

---

### **16 · Future Work**

"Looking ahead, we see some really exciting directions for this research."

"First, we want to **scale up** our data generation to larger, more diverse user groups. The current work proves the concept, but we need to validate it across more varied communication patterns and user behaviors."

"But what I'm most excited about is investigating **federated learning** approaches. Imagine if organizations could train these models locally on their own traffic patterns and then share only the model gradients – not the raw data – to improve everyone's models. This could give us the benefits of large-scale training while preserving privacy at an even deeper level."

"This could be a game-changer for how we approach collaborative security research in our community."

---

### **17 · Conclusion & Discussion**

"Let me wrap up with what I think are the key takeaways from this work."

"We've demonstrated that encrypted traffic can be meaningfully classified at the application, device, and user action level using **metadata alone**. This isn't just a theoretical possibility – we've shown it works with real-world accuracy levels."

"More importantly, this opens the door to fine-grained policy enforcement that doesn't require us to compromise user privacy. We can have our cake and eat it too – security visibility and privacy protection."

"I'm really looking forward to your questions and thoughts, especially around the federated learning possibilities and where you think the ethical boundaries should be for this kind of metadata analysis. There are fascinating research and policy questions here that I think our community is uniquely positioned to address."

"You can reach me at **[cenab@ualberta.ca](mailto:cenab@ualberta.ca)**, and all our code and data are available on GitHub and Zenodo for anyone who wants to build on this work."

"Thank you for your attention, and let's open this up for discussion."

---
