功能展示

註冊
![signup](https://user-images.githubusercontent.com/99523875/215364643-80067061-a247-498e-898e-511aa20d3408.gif)
登入
![login](https://user-images.githubusercontent.com/99523875/215364617-de23cea5-16db-4001-aea8-361c8c5487a9.gif)
購物車操作

評論功能

搜尋功能

價格排列(sorting)

---

#### **==註冊的帳號皆為 role=user,role=admin 的帳號請去 `關於我們(/about)`獲取,現在登入介面直接提供一鍵登入==**

---

用 **useState** 和 **useEffect** 完成路徑 **`/product`** 下的物品搜尋功能,附加搜尋延遲(debounce).
追加依據價格高低 **sort** 排列.
追加側欄的商品分類

---

用 **react-router** 完成 **SPA**,
劃分了 protected routes 及 public routes,
並控制**登入後**對 **`/login`** 和 **`/signup`** 及 **登入前** 對 **`/admin`** 的重新導向.
其他後續新增的類似功能不一一補述.

關於**仔細看看**對應的個別商品路徑
(ex:http://localhost:3000/product/item/63b41c303cb7c80244a724de)
利用了 **URL params**,
考慮到使用者可能存下該路徑,下次使用直接到這個路徑,
故在配置中使用 **useParams** 獲取上面商品 id,
並在加載時向後端請求資料並加載.

**加入購物車**則是針對使用者狀態
(**isLogin**)條件渲染不同元元件
(**登入前**導向登入頁面,**登入後**作為加入購物車功能的按鈕)
實現 **登入後** 才能完成個別物品留言

---

用 **redux toolkit** 完成狀態管理,使用 reducers 內 actions 控制 sync 的操作,
用 **createAsyncThunk api** 及 extrareducers 的 actions 控制 async 操作,
透過 **redux** , **ternary operator** 完成 <Navbar\/> 推車圖標上的購物車數量統計.
完成購物車邏輯.

---

用 **proxy** 配置代理為了獲取同源後端資源
(解決 cors 問題,**後端為 8080**,**前端為 3000**)
添加 crossOrigin="anonymous" attribute 解決部署後伺服因 CSP 擋住外部圖片的問題

---

用 **axios** 配合 在 redux 內的 createAsyncThunk api 獲取後端伺服資料
用 **axios** 和 **async,await** 配合 **useEffect** 自定義 hook:`useCartItem` 在 **<CartItem\/>** 使用獲取資料

---

用 **fetch** **then,catch** 處理獲取後端資料
並用 **useState** 和 **useEffect** 處理資料(路徑 **`/`** 下的 **<Home\/>** 下的 **<Slides\/>** )

---

用 **JWT** 處理**authentication** 的帳號註冊和登入系統(當註冊或登入**成功後**,
登入和註冊會送出資料給 server,server 會回傳一個名為 JWT 的 cookie(非 http-only),
以及資料 `{name,email,role}`,前端透過 redux 將資訊存進 store 中做後續運用.

當關掉瀏覽器重啟網頁的時候,在第一次 loading 頁面時,
透過 **<App\/>** 內 **js-cookie** 這個 package 判斷有 `{JWT=???}` 的 cookie 後會自動進行登入,
(rejected 時會在 extrareducer 內刪掉 cookie 並強制狀態為未登入預防 JWT cookie 存在但不能使用的情形)

認證後的資料也用 **authrization** 區分了 role (如 **<Navbar\/>** 內的 **後台** link 僅能由 `{role=admin}` 顯示)
request 發出,後端丟出 cookie 及 user,client side 透過 redux set 資料 `{name,email,role}`).

---

用**BOOTSTRAP5**及**react-bootstrap**完成樣式及組件運用
商品頁面的 **<Product\/>** 下的 **<Items\/>** 元件(路徑:/product)使用 BOOTSTRAP5 做了簡單的 **RWD**,
全幅下 row 有 3 個物品,橫向小於 576 時為 1 個物品
**react-bootstrap**的缺點是,很多東西都已封裝,想直接修改 sass 更改 root variable 是不可行的(已測試過)
有些元件可能用**BOOTSTRAP**直接刻比較理想(純 BOOTSTRAP 可自行透過修改 sass 修改)

---

用 **react-icons** 處理使用者頭像和錯誤提示等圖像

---

使用 **momentJS** 處理時間格式
在使用 locale 時 須直接從 node module 下的 moment/locale/zh-tw 引用配置 config
import moment from "moment";(一般只到這)
import "moment/locale/zh-tw";(追加項)
