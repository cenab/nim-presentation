---
marp: true
theme: hahnec
size: 16:9
paginate: true
footer: 'Network Identity Management: Application, Action and Device Aware Monitoring | STPSA 2025'
header: 'STPSA 2025 - IEEE COMPSAC Workshop'
---

<!-- _paginate: false -->
<!-- _footer: "" -->
<!-- _header: "" -->

# Network Identity Management: Application, Action and Device Aware Monitoring

<br>

Cenab Batu Bora¹, Julia Silva Weber², Nur Zincir-Heywood²

¹University of Alberta | ²Dalhousie University

*IEEE STPSA 2025 Workshop*

<div style="display: flex; justify-content: center; align-items: center; gap: 2em; margin-top: 2em;">
  <img src="../assets/dalhousie.png" alt="Dalhousie University Logo" style="height: 80px; background-color: white; padding: 10px; border-radius: 10px;">
  <img src="../assets/alberta.png" alt="University of Alberta Logo" style="height: 80px; background-color: white; padding: 10px; border-radius: 10px;">
</div>



<style scoped>
  section{justify-content: center;}
  h1 { font-size: 2.5em; }
  h2 { font-size: 1.5em; color: #666; }
</style>

---

# The Security Challenge in Critical Enterprise Networks

<div style="display: flex; justify-content: space-around; align-items: stretch; gap: 1.5em; margin-top: 1.5em;">

<!-- The Challenge -->
<div style="flex: 1; background-color: #fff0f0; border-left: 5px solid #c62828; padding: 1.2em; border-radius: 8px;">
<h3 style="margin-top: 0; color: #c62828;">The Challenge: A Network Black Box</h3>
<ul style="list-style-type: none; padding-left: 0; color: #333;">
  <li style="margin-bottom: 0.8em;  color: #333;"><strong>Encrypted Traffic:</strong> Renders content inspection (DPI) obsolete.</li>
  <li style="margin-bottom: 0.8em;  color: #333;"><strong>Context-Blind Policies:</strong> Firewalls see IPs, not distinct applications.</li>
  <li style="margin-bottom: 0.8em;  color: #333;"><strong>Invisible User Actions:</strong> Impossible to distinguish chats from sensitive file transfers.</li>
  <li style="color: #333;"><strong>BYOD Amplifies Risk:</strong> Unmanaged personal devices create security gaps.</li>
</ul>
</div>

<!-- The Dilemma -->
<div style="flex: 1; background-color: #eef2ff; border-left: 5px solid #283593; padding: 1.2em; border-radius: 8px;">
<h3 style="margin-top: 0; color: #283593;">The Result: A Trust Dilemma</h3>
<p style="margin-bottom: 1.2em; color: #333;">This blindness forces a reactive posture and creates fundamental conflicts:</p>
<ul style="list-style-type: none; padding-left: 0; text-align: center; font-size: 1.1em; font-weight: 500; color: #333;">
  <li style="margin-bottom: 0.7em; color: #333;">Privacy <span style="color: #c62828; font-weight: 700;">vs.</span> Security</li>
  <li style="margin-bottom: 0.7em; color: #333;">Encryption <span style="color: #c62828; font-weight: 700;">vs.</span> Visibility</li>
  <li style="color: #333;">User Autonomy <span style="color: #c62828; font-weight: 700;">vs.</span> Control</li>
</ul>
</div>

</div>

---

# Research Question & Our Approach

<div style="display: flex; justify-content: space-around; align-items: stretch; gap: 1.5em; margin-top: 1.5em;">

<!-- The Research Question -->
<div style="flex: 1; background-color: #fff0f0; border-left: 5px solid #c62828; padding: 1.5em; border-radius: 8px; text-align: center;">
<h3 style="margin-top: 0; color: #c62828; font-size: 1.5em;">The Research Question</h3>
<p style="font-size: 1.1em; line-height: 1.5; color: #333;">How can organizations improve visibility into encrypted mobile app usage on BYOD networks for policy control, without compromising encryption or user privacy?</p>
</div>

<!-- Our Solution -->
<div style="flex: 1; background-color: #e8f5e9; border-left: 5px solid #2e7d32; padding: 1.5em; border-radius: 8px; text-align: center;">
<h3 style="margin-top: 0; color: #2e7d32; font-size: 1.5em;">Our Solution</h3>
<p style="font-size: 1.1em; line-height: 1.5; color: #333;">Machine learning models analyze encrypted traffic metadata to identify applications, devices, and user actions—preserving privacy while enabling security.</p>
</div>

</div>

---

<div style="display: flex; flex-direction: column; gap: 1em; margin: 0.5em 1em;">

<!-- Title Box -->
<div style="background-color: #eef2ff; border-left: 5px solid #283593; padding: 1em; border-radius: 8px; text-align: center;">
  <h3 style="margin: 0; color: #283593; font-size: 1.6em;">NIM Framework</h3>
  <p style="margin: 0.5em 0 0 0; color: #333; font-size: 1.1em;">Identity-based Encrypted Application Monitoring</p>
</div>

<!-- Innovation Grid -->
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1em;">
  <!-- ML Models -->
  <div style="background-color: #f3e5f5; border-left: 5px solid #6a1b9a; padding: 0.8em; border-radius: 8px;">
    <h4 style="margin: 0; color: #6a1b9a; font-size: 1.1em;">Cloud-Native Traffic Generation</h4>
    <p style="margin: 0.5em 0 0 0; color: #333; font-size: 0.9em;">Scalable cloud framework emulates Android devices to generate realistic traffic, enabling robust ML training without specialized hardware.</p>
  </div>
  
  <!-- Classification -->
  <div style="background-color: #e8f5e9; border-left: 5px solid #2e7d32; padding: 0.8em; border-radius: 8px;">
    <h4 style="margin: 0; color: #2e7d32; font-size: 1.1em;">Dynamic Traffic Isolation</h4>
    <p style="margin: 0.5em 0 0 0; color: #333; font-size: 0.9em;">Combines time analysis, TLS SNI, and IP whitelisting to isolate app traffic by adapting to dynamic network changes.</p>
  </div>
  
  <!-- Privacy -->
  <div style="background-color: #fff3e0; border-left: 5px solid #e65100; padding: 0.8em; border-radius: 8px;">
    <h4 style="margin: 0; color: #e65100; font-size: 1.1em;">Environment-Agnostic Feature Engineering</h4>
    <p style="margin: 0.5em 0 0 0; color: #333; font-size: 0.9em;">Isolates core communication patterns and ignores network-specific metrics to build robust, environment-independent models.</p>
  </div>
  
  <!-- Zero Trust -->
  <div style="background-color: #e3f2fd; border-left: 5px solid #1565c0; padding: 0.8em; border-radius: 8px;">
    <h4 style="margin: 0; color: #1565c0; font-size: 1.1em;">Granular Identity-Aware Visibility</h4>
    <p style="margin: 0.5em 0 0 0; color: #333; font-size: 0.9em;">ML models identify app, device, and action from encrypted traffic, providing granular visibility (e.g., 'User A is on Signal') without decryption.</p>
  </div>
</div>

</div>

---


# Key Novel Contributions

<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1em; margin: 0.5em;">

<!-- ML-Based Analysis -->
<div style="background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); border-radius: 8px; padding: 1.2em; border-left: 5px solid #2e7d32;">
  <h3 style="color: #2e7d32; margin: 0; font-size: 1.2em;">1. ML-Based Encrypted Traffic Analysis</h3>
  <div style="margin-top: 0.8em; color: #1b5e20;">
    <p style="margin: 0.5em 0;">Advanced metadata analysis for encrypted traffic</p>
    <p style="margin: 0.5em 0;">High-accuracy detection of user actions and apps</p>
    <p style="margin: 0.5em 0;">Identity-driven approach to network monitoring</p>
  </div>
</div>

<!-- Cloud-Native Generation -->
<div style="background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); border-radius: 8px; padding: 1.2em; border-left: 5px solid #1565c0;">
  <h3 style="color: #1565c0; margin: 0; font-size: 1.2em;">2. Cloud-Native Traffic Generation</h3>
  <div style="margin-top: 0.8em; color: #0d47a1;">
    <p style="margin: 0.5em 0;">Scalable framework for diverse traffic datasets</p>
    <p style="margin: 0.5em 0;">No dependency on sensitive live user data</p>
    <p style="margin: 0.5em 0;">Enables robust ML model development</p>
  </div>
</div>

<!-- Behavior Simulation -->
<div style="background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%); border-radius: 8px; padding: 1.2em; border-left: 5px solid #6a1b9a;">
  <h3 style="color: #6a1b9a; margin: 0; font-size: 1.2em;">3. Realistic Behavior Simulation</h3>
  <div style="margin-top: 0.8em; color: #4a148c;">
    <p style="margin: 0.5em 0;">Simulates natural conversation patterns</p>
    <p style="margin: 0.5em 0;">Creates detailed traffic signatures</p>
    <p style="margin: 0.5em 0;">Enables precise app and device identification</p>
  </div>
</div>

</div>

---

# Experimental Steps

<style scoped>
.roadmap-container {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  position: relative;
  width: 90%;
  margin: 2em auto;
  padding-top: 40px;
  height: 70vh;
}
.roadmap-container::before {
  content: '';
  position: absolute;
  top: 60px;
  left: 5%;
  width: 90%;
  height: 4px;
  background-color: #ddd;
  z-index: 0;
}
.roadmap-step {
  position: relative;
  z-index: 1;
  text-align: center;
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.roadmap-step .icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fff;
  border: 4px solid #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1em;
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
}
.roadmap-step.step1 .icon { color: #1976d2; border-color: #1976d2;}
.roadmap-step.step2 .icon { color: #388e3c; border-color: #388e3c;}
.roadmap-step.step3 .icon { color: #7b1fa2; border-color: #7b1fa2;}

.roadmap-step .content {
  background-color: #f8f9fa;
  padding: 1.2em;
  border-radius: 8px;
  width: 100%;
}
.roadmap-step.step1 .content { border-top: 4px solid #2196f3; }
.roadmap-step.step2 .content { border-top: 4px solid #4caf50; }
.roadmap-step.step3 .content { border-top: 4px solid #9c27b0; }

.roadmap-step h3 {
  margin-top: 0;
  font-size: 1.2em;
}
.roadmap-step.step1 h3 { color: #1976d2; }
.roadmap-step.step2 h3 { color: #388e3c; }
.roadmap-step.step3 h3 { color: #7b1fa2; }
.roadmap-step ul {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
  color: #333;
  text-align: left;
}
.roadmap-step ul li {
  margin-bottom: 0.5em;
}
</style>

<div class="roadmap-container">
  <div class="roadmap-step step1">
    <div class="icon">1</div>
    <div class="content">
      <h3>Traffic Generation Framework</h3>
      <ul>
        <li style="color: #333;">✓ Cloud-native</li>
        <li style="color: #333;">✓ Mobile traffic datasets</li>
      </ul>
    </div>
  </div>
  <div class="roadmap-step step2">
    <div class="icon">2</div>
    <div class="content">
      <h3>Traffic Processing</h3>
      <ul>
        <li style="color: #333;">✓ Traffic isolation</li>
        <li style="color: #333;">✓ Dynamic filtering</li>
        <li style="color: #333;">✓ TLS SNI analysis</li>
      </ul>
    </div>
  </div>
  <div class="roadmap-step step3">
    <div class="icon">3</div>
    <div class="content">
      <h3>Building the ML pipeline</h3>
      <ul>
        <li style="color: #333;">✓ ANOVA F-value study</li>
        <li style="color: #333;">✓ Feature engineering</li>
        <li style="color: #333;">✓ Model evaluation</li>
      </ul>
    </div>
  </div>
</div>

---

# Traffic Generation System

<div style="display: flex; gap: 2em;">

<div style="flex: 1;">

### System Overview
- **Platform:** Cuttlefish on Google Cloud
- **Scale:** 8 concurrent IMAs
- **Duration:** 37 hours of traffic
- **Behavior:** Natural conversation patterns
- **Timing:** 15-60s random intervals
- **Tools:** tcpdump + Tranalyzer2

</div>

<div style="flex: 1;">

### Dialogue Schedule Example
| Dialogue | Device | IMA | Wait Time (s) |
|----------|--------|-----|---------------|
| Nay, answer me. ... | 3 | signal | 45 |
| He. ... | 2 | signal | 60 |
| You come most ... | 3 | teams | 55 |
| Not a mouse ... | 3 | skype | 58 |
| Well, good night. ... | 1 | signal | 33 |
| *... conversation continues ...* | | | |

</div>

</div>

---


# Visualizing the Traffic Generation Framework

<video src="../assets/Real-life%20Click%20Farm.mp4" autoplay loop muted playsinline style="display: block; margin: auto; width: 100%; height: calc(100vh - 500px);"></video>

---

# Traffic Generation Architecture

<style>
.diagram-bg {
  border-radius: 8px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
}
</style>

<div class="diagram-bg">

```mermaid
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'primaryColor': '#e1f5fe',
    'primaryTextColor': '#000',
    'primaryBorderColor': '#00b0ff',
    'lineColor': '#fff',
    'secondaryColor': '#f3e5f5',
    'tertiaryColor': '#fff3e0',
    'fontSize': '32px',
    'messageFontSize': '32px',
    'messageFont': 'arial',
    'nodeFontSize': '32px',
    'lineWidth': '200px'
  },
  'flowchart': {
    'nodeSpacing': 40,
    'rankSpacing': 50,
    'padding': 10,
    'width': 1600,
    'height': 800,
    'diagramPadding': 0,
    'htmlLabels': true,
    'curve': 'basis'
  }
}}%%
graph LR
    %% Control Layer with bigger boxes
    Orchestrator["<div style='padding: 1.5em;'> Orchestrator<br/><span style='font-size: 1.6em;'>Traffic Generation<br/>Controller</span></div>"]
    Server["<div style='padding: 1.5em;'>Central Server<br/><span style='font-size: 1.6em;'>Message & Command<br/>Distribution</span></div>"]
    
    %% Cloud Layer
    CI1["<div style='font-size: 1.6em; padding: 1.2em;'> Cloud<br/>Instance 1</div>"]
    CI2["<div style='font-size: 1.6em; padding: 1.2em;'> Cloud<br/>Instance 2</div>"]
    CI3["<div style='font-size: 1.6em; padding: 1.2em;'> Cloud<br/>Instance 3</div>"]
    
    %% Device Layer
    CD1["<div style='font-size: 1.6em; padding: 1.2em;'> Virtual<br/>Device 1</div>"]
    CD2["<div style='font-size: 1.6em; padding: 1.2em;'> Virtual<br/>Device 2</div>"]
    CD3["<div style='font-size: 1.6em; padding: 1.2em;'> Virtual<br/>Device 3</div>"]
    
    %% Communication Layer with bigger box
    GC["<div style='padding: 1.5em;'> Group Chats<br/><span style='font-size: 1.6em;'>Multi-Device<br/>Communication</span></div>"]

    %% Connections with better spacing and larger font
    Orchestrator --> |"<div style='font-size: 1.5em;'>Schedules<br/>Instructions</div>"| Server
    Server --> |"<div style='font-size: 1.5em;'>WebSocket<br/>Messages</div>"| CI1 & CI2 & CI3
    CI1 --> |"<div style='font-size: 1.5em;'>ADB<br/>Commands</div>"| CD1
    CI2 --> |"<div style='font-size: 1.5em;'>ADB<br/>Commands</div>"| CD2
    CI3 --> |"<div style='font-size: 1.5em;'>ADB<br/>Commands</div>"| CD3
    CD1 & CD2 & CD3 --> |"<div style='font-size: 1.5em;'>IMA<br/>Messages</div>"| GC

    %% Enhanced styling with bigger boxes
    classDef control fill:#e1f5fe,stroke:#00b0ff,stroke-width:5px,rx:15,ry:15
    classDef cloud fill:#f3e5f5,stroke:#9c27b0,stroke-width:4px,rx:12,ry:12
    classDef devices fill:#fff3e0,stroke:#ff9100,stroke-width:4px,rx:12,ry:12
    classDef communication fill:#e8f5e9,stroke:#43a047,stroke-width:5px,rx:15,ry:15

    %% Apply styles
    class Orchestrator,Server control
    class CI1,CI2,CI3 cloud
    class CD1,CD2,CD3 devices
    class GC communication

    %% Add styling for better text visibility
    style Orchestrator font-weight:bold,font-size:32px
    style Server font-weight:bold,font-size:32px
    style GC font-weight:bold,font-size:32px
    linkStyle default stroke-width:20px,stroke:#fff
```

</div>

---

# Traffic Preprocessing Pipeline

<style>
.diagram-bg {
  border-radius: 8px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
}
</style>

<div class="diagram-bg">

```mermaid
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'primaryColor': '#e1f5fe',
    'primaryTextColor': '#000',
    'primaryBorderColor': '#00b0ff',
    'lineColor': '#fff',
    'secondaryColor': '#f3e5f5',
    'tertiaryColor': '#fff3e0',
    'fontSize': '40px',
    'messageFontSize': '40px',
    'messageFont': 'arial',
    'nodeFontSize': '40px',
    'edgeLabelBackground': '#ffffff',
    'lineWidth': '200px'
  },
  'flowchart': {
    'nodeSpacing': 50,
    'rankSpacing': 80,
    'padding': 20,
    'width': 1600,
    'height': 800,
    'diagramPadding': 10,
    'htmlLabels': true,
    'curve': 'basis'
  }
}}%%
graph LR
    %% Data Capture Stage
    A["<div style='padding: 1.8em; min-width: 250px;'><h3 style='margin:0; color: #0277bd; font-size: 1.8em;'>Data Capture</h3><div style='font-size: 1.9em; margin-top: 0.5em;'>Encrypted Traffic</div></div>"]

    %% Processing Stage
    B["<div style='padding: 1.8em; min-width: 250px;'><h3 style='margin:0; color: #7b1fa2; font-size: 1.8em;'>Traffic Isolation</h3><div style='font-size: 1.9em; margin-top: 0.5em;'>Initial Processing</div></div>"]
    DB[("<div style='padding: 1.8em;'><h3 style='margin:0; color: #7b1fa2; font-size: 1.8em;'>Session DB</h3><div style='font-size: 1.9em; margin-top: 0.5em;'>Traffic Metadata</div></div>")]
    Methods{"<div style='padding: 1.8em;'><h3 style='margin:0; color: #7b1fa2; font-size: 1.8em;'>Analysis</h3><div style='font-size: 1.9em; margin-top: 0.5em;'>Isolation Methods</div></div>"}

    %% Isolation Techniques
    B1["<div style='padding: 1.8em;'><h3 style='margin:0; color: #ef6c00; font-size: 1.8em;'>Time Analysis</h3><div style='font-size: 1.9em; margin-top: 0.5em;'>Bounded Correlation</div></div>"]
    B2["<div style='padding: 1.8em;'><h3 style='margin:0; color: #ef6c00; font-size: 1.8em;'>TLS Analysis</h3><div style='font-size: 1.9em; margin-top: 0.5em;'>SNI Inspection</div></div>"]
    B3["<div style='padding: 1.8em;'><h3 style='margin:0; color: #ef6c00; font-size: 1.8em;'>IP Analysis</h3><div style='font-size: 1.9em; margin-top: 0.5em;'>Range Validation</div></div>"]

    %% Output Stage
    C["<div style='padding: 1.8em; min-width: 250px;'><h3 style='margin:0; color: #2e7d32; font-size: 1.8em;'>Results</h3><div style='font-size: 1.9em; margin-top: 0.5em;'>Clean IMA Traffic</div></div>"]

    %% Connections with descriptive labels
    A --> |"<div style='font-size: 1.9em;'>Raw Traffic</div>"| B
    B --> |"<div style='font-size: 1.9em;'>Session Data</div>"| DB
    DB --> |"<div style='font-size: 1.9em;'>Analysis Input</div>"| Methods
    Methods --> |"<div style='font-size: 1.9em;'>Time-based</div>"| B1
    Methods --> |"<div style='font-size: 1.9em;'>Protocol</div>"| B2
    Methods --> |"<div style='font-size: 1.9em;'>Network</div>"| B3
    B1 & B2 & B3 --> |"<div style='font-size: 1.9em;'>Validated Traffic</div>"| C

    %% Styling definitions with thicker borders
    classDef capture fill:#e1f5fe,stroke:#00b0ff,stroke-width:12px,rx:12,ry:12
    classDef processing fill:#f3e5f5,stroke:#9c27b0,stroke-width:12px,rx:12,ry:12
    classDef techniques fill:#fff3e0,stroke:#ff9100,stroke-width:12px,rx:12,ry:12
    classDef output fill:#e8f5e9,stroke:#43a047,stroke-width:12px,rx:12,ry:12

    %% Apply styles to nodes
    class A capture
    class B,DB,Methods processing
    class B1,B2,B3 techniques
    class C output

    %% Link styling
    linkStyle default stroke-width:20px,stroke:#fff
```

</div>

---
# Building the ML Model: App & Device

<div style="display: flex; flex-direction: column; gap: 1.5em; margin-top: 1em;">

<!-- Top Box: App & Device ID -->
<div style="background-color: #e3f2fd; border-left: 5px solid #1565c0; padding: 1.5em; border-radius: 8px;">
<h3 style="margin-top: 0; color: #1565c0;">App & Device Identification</h3>
<p style="color: #333;">A multi-output model was trained to predict both the application and its source device from a single traffic flow.</p>
<ul style="padding-left: 1.2em;">
  <li style="margin-bottom: 0.5em; color: #333;"><strong>Feature Selection:</strong> ANOVA F-value analysis on 109 raw features to find key identifiers like `tcpMSS`.</li>
  <li style="margin-bottom: 0.5em; color: #333;"><strong>Models Evaluated:</strong> Tree-based classifiers (Decision Tree, Random Forest, Gradient Boosting).</li>
  <li style="margin-bottom: 0.5em; color: #333;"><strong>Top Performer:</strong> Gradient Boosting delivered the highest accuracy for IMA identification.</li>
  <li style="color: #333;"><strong>Validation:</strong> Rigorous 10-fold cross-validation ensured model robustness.</li>
</ul>
</div>

---
# Building the ML Model: User Action 

<div style="display: flex; flex-direction: column; gap: 1.5em; margin-top: 1em;">

<!-- Bottom Box: Action Classification -->
<div style="background-color: #e8f5e9; border-left: 5px solid #2e7d32; padding: 1.5em; border-radius: 8px;">
<h3 style="margin-top: 0; color: #2e7d32;">User Action Classification</h3>
<p style="color: #333;">A binary classifier was built to distinguish between group chats and 1-on-1 messages as a proof-of-concept.</p>
<ul style="padding-left: 1.2em;">
  <li style="margin-bottom: 0.5em; color: #333;"><strong>Dataset:</strong> Combined our group chat data with a public 1-on-1 chat dataset for diverse patterns.</li>
  <li style="margin-bottom: 0.5em; color: #333;"><strong>Feature Engineering:</strong> Focused on environment-agnostic patterns (e.g., timing ratios), excluding network-specific metrics.</li>
  <li style="margin-bottom: 0.5em; color: #333;"><strong>Top Performer:</strong> Gradient Boosting again proved most effective.</li>
  <li style="color: #333;"><strong>Insight:</strong> Confirmed that distinct user actions have unique, classifiable metadata signatures.</li>
</ul>
</div>

</div>

---
# ML Architecture

<div class="diagram-bg">

```mermaid
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'primaryColor': '#e1f5fe',
    'primaryTextColor': '#000',
    'primaryBorderColor': '#00b0ff',
    'lineColor': '#fff',
    'secondaryColor': '#f3e5f5',
    'tertiaryColor': '#fff3e0',
    'fontSize': '40px',
    'messageFontSize': '40px',
    'messageFont': 'arial',
    'nodeFontSize': '40px',
    'edgeLabelBackground': '#ffffff',
    'lineWidth': '200px'
  },
  'flowchart': {
    'nodeSpacing': 50,
    'rankSpacing': 80,
    'padding': 20,
    'width': 1600,
    'height': 800,
    'diagramPadding': 10,
    'htmlLabels': true,
    'curve': 'basis'
  }
}}%%
graph LR
    %% Input Stage
    A["<div style='padding: 1.8em; min-width: 250px;'><h3 style='margin:0; color: #0277bd; font-size: 1.8em;'>Data Input</h3><div style='font-size: 1.9em; margin-top: 0.5em;'>Labeled Traffic Flows</div></div>"]

    %% Feature Processing Stage
    B["<div style='padding: 1.8em; min-width: 250px;'><h3 style='margin:0; color: #7b1fa2; font-size: 1.8em;'>Feature Processing</h3><div style='font-size: 1.9em; margin-top: 0.5em;'>Raw Feature Extraction</div></div>"]
    C["<div style='padding: 1.8em; min-width: 250px;'><h3 style='margin:0; color: #7b1fa2; font-size: 1.8em;'>Feature Selection</h3><div style='font-size: 1.9em; margin-top: 0.5em;'>Feature Engineering</div></div>"]

    %% Models Stage
    D["<div style='padding: 1.8em; min-width: 250px;'><h3 style='margin:0; color: #ef6c00; font-size: 1.8em;'>Multi-Output</h3><div style='font-size: 1.9em; margin-top: 0.5em;'>App & Device Classifier</div></div>"]
    G["<div style='padding: 1.8em; min-width: 250px;'><h3 style='margin:0; color: #ef6c00; font-size: 1.8em;'>Binary</h3><div style='font-size: 1.9em; margin-top: 0.5em;'>Group vs 1:1 Classifier</div></div>"]

    %% Engineering Stage
    F["<div style='padding: 1.8em; min-width: 250px;'><h3 style='margin:0; color: #1565c0; font-size: 1.8em;'>Action-Specific</h3><div style='font-size: 1.9em; margin-top: 0.5em;'>Feature Engineering</div></div>"]

    %% Output Stage
    E["<div style='padding: 1.8em; min-width: 250px;'><h3 style='margin:0; color: #2e7d32; font-size: 1.8em;'>App & Device</h3><div style='font-size: 1.9em; margin-top: 0.5em;'>98.6% F1-Score</div></div>"]
    H["<div style='padding: 1.8em; min-width: 250px;'><h3 style='margin:0; color: #2e7d32; font-size: 1.8em;'>Group vs 1:1</h3><div style='font-size: 1.9em; margin-top: 0.5em;'>73.3% F1-Score</div></div>"]

    %% Connections with descriptive labels
    A --> |"<div style='font-size: 1.9em;'>Raw Data</div>"| B
    B --> |"<div style='font-size: 1.9em;'>Features</div>"| C
    C --> |"<div style='font-size: 1.9em;'>Selected Features</div>"| D
    D --> |"<div style='font-size: 1.9em;'>Classification</div>"| E
    
    B --> |"<div style='font-size: 1.9em;'>Raw Features</div>"| F
    F --> |"<div style='font-size: 1.9em;'>Engineered Features</div>"| G
    G --> |"<div style='font-size: 1.9em;'>Classification</div>"| H

    %% Styling definitions with thicker borders
    classDef input fill:#e1f5fe,stroke:#00b0ff,stroke-width:6px,rx:12,ry:12
    classDef features fill:#f3e5f5,stroke:#9c27b0,stroke-width:6px,rx:12,ry:12
    classDef models fill:#fff3e0,stroke:#ff9100,stroke-width:6px,rx:12,ry:12
    classDef engineering fill:#e3f2fd,stroke:#1565c0,stroke-width:6px,rx:12,ry:12
    classDef output fill:#e8f5e9,stroke:#43a047,stroke-width:6px,rx:12,ry:12

    %% Apply styles to nodes
    class A input
    class B,C features
    class D,G models
    class F engineering
    class E,H output

    %% Link styling
    linkStyle default stroke-width:20px,stroke:#fff
```

</div>

---

# Performance Results

<div style="display: flex; align-items: center; gap: 3em;">
<div style="flex: 1;">

## **98.6% F1-Score**
### Application Classification
*Gradient Boosting ML Model*

## **~100% Accuracy**
### Device Identification
*Near-perfect ML performance*

## **73.3% F1-Score**
### User Action Classification
*Group vs 1:1 Chats (Overall)*

</div>
<div style="flex: 1; text-align: center; font-size: 0.7em;">

#### User Action Classification (Gradient Boosting)

| IMA       | Accuracy | Precision | Recall | F1 Score |
|:----------|:--------:|:---------:|:------:|:--------:|
| Discord   | 90.6%    | 90.8%     | 90.2%  | **90.4%**|
| Messenger | 82.2%    | 82.4%     | 80.5%  | 81.1%    |
| Signal    | 50.8%    | 27.4%     | 43.4%  | 33.6%    |
| Slack     | 72.4%    | 72.3%     | 71.8%  | 71.9%    |
| Teams     | 75.8%    | 75.5%     | 76.7%  | 75.5%    |
| Telegram  | 85.5%    | 86.3%     | 84.9%  | 85.2%    |

<br>

#### Model Performance Comparison (Min-Max Results)

| Model           | App F1 | Device F1 | Action F1 |
|:----------------|:------:|:---------:|:---------:|
| Naive Bayes     | .64-.70| .19-.26   | .30-.88   |
| Decision Tree   | .96-.97| .99-1.0   | .33-.87   |
| Random Forest   | .96-.97| .99-.99   | .32-.89   |
| **Grad. Boost** | **.97-.98**| **.99-1.0** | .33-.90   |
| SVM             | .70-.72| .23-.26   | .30-.91   |

</div>
</div>

---

# NIM as a Concept

- **Core Idea**: NIM uses encrypted traffic metadata to identify the application, device, and user actions without decryption.
- **Access Control**: It enables role-based access control (RBAC) for encrypted applications.
  - Organizations define access groups (e.g., Developers, Executives).
  - Permissions for applications are assigned to these groups.
- **How it Works**:
  1. Traffic metadata is collected from network points (firewalls, switches).
  2. An ML engine classifies traffic, identifying the app, device, and action.
  3. A policy engine combines this with user identity and group data.
  4. Access rules are enforced via existing infrastructure (SDN, VPNs).
- **Proactive Security**: NIM can proactively block unauthorized application access, aligning with Zero Trust principles.


---

# Future Work

- **Scale the Data Generation**:
  - Increase the number of user groups to twenty or more.
  - Capture richer and more complex multi-user dynamics.

- **Explore Federated Learning**:
  - Train models in a distributed manner without centralizing sensitive data.
  - Enhances user privacy.
  - Allows for collaborative improvements to NIM models across organizations.

---

<!-- _paginate: false -->
<!-- _footer: "" -->

# Conclusion & Discussion

<div style="text-align: center; font-size: 1.2em; margin-top: 2em;">

### Thank you for listening!

<br>

### Open Questions for Discussion:

How can **federated learning** enhance multi-org security?
What **AI ethics** considerations are most critical?

<br>

**Contact:** cenab@ualberta.ca | **Code & Data:** [GitHub/Zenodo](https://doi.org/10.5281/zenodo.15460189)

</div>

<style scoped>
  section{justify-content: center;}
</style>