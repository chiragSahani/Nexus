# 🌦️💰 CryptoWeather Nexus 🚀  
A **real-time dashboard** that seamlessly blends **weather data**, **cryptocurrency trends**, and **live alerts** into a sleek, multi-page experience. Built with **Next.js**, **Redux**, **WebSockets**, and **Tailwind CSS**, this project keeps you informed on market movements and climate conditions—at a glance!  

---

## 🚀 Live Demo  
🔗 **[CryptoWeather Nexus](https://chiragnexus.netlify.app/)** 

---

## 📌 Features  
### 🌍 Weather Dashboard  
✔️ Displays real-time weather updates for **New York, London, Tokyo**  
✔️ Shows **temperature, humidity, and conditions**  
✔️ Historical weather trends with **charts**  

### 📊 Crypto Dashboard  
✔️ Live tracking of **Bitcoin, Ethereum, and another crypto**  
✔️ Displays **price, 24h change, and market cap**  
✔️ WebSocket-powered **real-time updates**  

### 📰 Crypto News  
✔️ Fetches **latest 5 headlines** from a crypto news API  
✔️ Clickable links for **in-depth analysis**  

### 🔥 Real-time Alerts  
✔️ **Price alerts** for BTC/ETH (WebSocket-powered)  
✔️ **Simulated weather alerts** for extreme conditions  
✔️ Instant **toast notifications**  

### 🌐 Multi-Page & Routing  
✔️ **City Details Page** - Weather history & trends  
✔️ **Crypto Details Page** - Historical prices & analytics  

### 📡 API Integrations  
🔹 **Weather Data** → OpenWeatherMap API  
🔹 **Crypto Prices** → CoinGecko API + CoinCap WebSockets  
🔹 **Crypto News** → NewsData.io  

---

## 🛠️ Tech Stack  
- **Framework:** [Next.js (13+)](https://nextjs.org/)  
- **UI Styling:** [Tailwind CSS](https://tailwindcss.com/)  
- **State Management:** Redux Toolkit + Thunk  
- **Data Fetching:** Axios  
- **Real-time WebSockets:** CoinCap API  

---

## 🚀 Getting Started  

### 🔧 Prerequisites  
- Node.js (v16+)  
- Git & GitHub account  
- API keys for OpenWeather, CoinGecko, NewsData.io  

### 🛠️ Setup & Installation  
```bash
# Clone the repository
git clone https://github.com/chiragSahani/Nexus.git
cd Nexus

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env  # Rename the file
# Add your API keys in the .env file

# Run locally
npm run dev
```
Now, open **http://localhost:3000** in your browser!  

---

## 📡 Environment Variables  
Set up your `.env.local` file with:  
```
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key
NEXT_PUBLIC_NEWSDATA_API_KEY=your_newsdata_api_key
NEXT_PUBLIC_COINGECKO_API_KEY=your_coingecko_api_key
```

---

## 🚀 Deployment  
Easily deploy to **Vercel**:  
```bash
vercel deploy
```
Ensure you add your **API keys** in Vercel’s environment settings.  

---

## 🛠️ Development Workflow  
1️⃣ **Clone & Install** → Get the project running locally  
2️⃣ **Integrate APIs** → Add your API keys in `.env`  
3️⃣ **Develop & Commit** → Follow a structured Git commit history  
4️⃣ **Test & Deploy** → Push to GitHub & deploy on Vercel  

---



## 🏆 Challenges & Solutions  

### 1️⃣ **Handling API Rate Limits**  
- **Challenge:** OpenWeatherMap and CoinGecko APIs enforce rate limits, which caused intermittent failures during frequent data fetches.  
- **Solution:** Implemented **request caching** using `localStorage` and **retry logic** with exponential backoff. Optimized API calls by **batching requests** where possible.  

### 2️⃣ **WebSocket Integration for Live Crypto Updates**  
- **Challenge:** Managing real-time crypto updates via WebSockets while preventing memory leaks.  
- **Solution:** Utilized **Redux Toolkit** to manage WebSocket connections efficiently. Ensured proper **cleanup** of WebSocket listeners on component unmount using `useEffect`.  

### 3️⃣ **Ensuring Smooth UI Performance**  
- **Challenge:** Continuous updates from APIs and WebSockets caused unnecessary re-renders, impacting performance.  
- **Solution:** Used **React.memo**, **lazy loading**, and **debouncing** to optimize rendering. Minimized unnecessary state updates with **Redux selectors**.  

### 4️⃣ **Crypto News API Availability Issues**  
- **Challenge:** NewsData.io API sometimes returned incomplete or outdated news articles.  
- **Solution:** Implemented a **fallback mechanism** by fetching from an alternative API (`CryptoCompare`) when the primary API failed.  

### 5️⃣ **Environment Variable Security**  
- **Challenge:** Protecting sensitive API keys while ensuring smooth deployment on Vercel.  
- **Solution:** Stored API keys in `.env.local`, configured Vercel's **environment variables**, and ensured they were **excluded from version control** via `.gitignore`.  



---

## 🛡️ Security & Best Practices  
✅ **API keys stored securely** using environment variables  
✅ **Error handling** for API failures & connection issues  
✅ **Optimized performance** with server-side rendering (SSR)  

---

## 🤝 Contributing  
Want to contribute? 🚀 Open a PR or raise an issue!  
1️⃣ **Fork the repo**  
2️⃣ **Create a feature branch** (`git checkout -b feature-name`)  
3️⃣ **Commit changes** (`git commit -m "Add new feature"`)  
4️⃣ **Push to GitHub** (`git push origin feature-name`)  
5️⃣ **Open a Pull Request**  

---

## 📜 License  
MIT License – Free to use & modify!  

---

🚀 Happy Coding! 🚀
