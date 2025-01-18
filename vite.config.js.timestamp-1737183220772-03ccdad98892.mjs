// vite.config.js
import react from "file:///H:/GitHub/poznavacka/node_modules/@vitejs/plugin-react/dist/index.mjs";
import fs from "fs";
import { defineConfig } from "file:///H:/GitHub/poznavacka/node_modules/vite/dist/node/index.js";
var poznavacky = {};
var path = "./public/assets";
var dir = fs.readdirSync(path).filter((f) => !f.includes("."));
function sortingAlg(a, b) {
  if (/\d/.test(a.slice(0, 3)) && /\d/.test(b.slice(0, 3))) {
    return parseInt(a.replace(/\D/g, "")) - parseInt(b.replaceAll(/\D/g, ""));
  }
  return a - b;
}
dir.forEach((f) => {
  path = `./public/assets/${f}`;
  const files = fs.readdirSync(path).sort(sortingAlg);
  while (files.some((f2) => !f2.includes("."))) {
    let folder = files.find((f2) => !f2.includes("."));
    let newFiles = fs.readdirSync(`./public/assets/${f}/${folder}`).sort(sortingAlg);
  }
  poznavacky[f] = files;
});
var vite_config_default = defineConfig({
  plugins: [react()],
  define: {
    __DIR__: JSON.stringify(poznavacky)
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJIOlxcXFxHaXRIdWJcXFxccG96bmF2YWNrYVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiSDpcXFxcR2l0SHViXFxcXHBvem5hdmFja2FcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0g6L0dpdEh1Yi9wb3puYXZhY2thL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcclxuaW1wb3J0IGZzIGZyb20gJ2ZzJztcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbi8vaW1wb3J0IHVzZVBIUCBmcm9tICd2aXRlLXBsdWdpbi1waHAnO1xyXG5cclxubGV0IHBvem5hdmFja3kgPSB7fTtcclxubGV0IHBhdGggPSAnLi9wdWJsaWMvYXNzZXRzJztcclxuY29uc3QgZGlyID0gZnMucmVhZGRpclN5bmMocGF0aCkuZmlsdGVyKChmKSA9PiAhZi5pbmNsdWRlcygnLicpKTtcclxuXHJcbmZ1bmN0aW9uIHNvcnRpbmdBbGcoYSwgYikge1xyXG5cdGlmICgvXFxkLy50ZXN0KGEuc2xpY2UoMCwgMykpICYmIC9cXGQvLnRlc3QoYi5zbGljZSgwLCAzKSkpIHtcclxuXHRcdHJldHVybiBwYXJzZUludChhLnJlcGxhY2UoL1xcRC9nLCAnJykpIC0gcGFyc2VJbnQoYi5yZXBsYWNlQWxsKC9cXEQvZywgJycpKTtcclxuXHR9XHJcblx0cmV0dXJuIGEgLSBiO1xyXG59XHJcblxyXG5kaXIuZm9yRWFjaCgoZikgPT4ge1xyXG5cdHBhdGggPSBgLi9wdWJsaWMvYXNzZXRzLyR7Zn1gO1xyXG5cdGNvbnN0IGZpbGVzID0gZnMucmVhZGRpclN5bmMocGF0aCkuc29ydChzb3J0aW5nQWxnKTtcclxuXHR3aGlsZSAoZmlsZXMuc29tZSgoZikgPT4gIWYuaW5jbHVkZXMoJy4nKSkpIHtcclxuXHRcdGxldCBmb2xkZXIgPSBmaWxlcy5maW5kKChmKSA9PiAhZi5pbmNsdWRlcygnLicpKTtcclxuXHRcdGxldCBuZXdGaWxlcyA9IGZzLnJlYWRkaXJTeW5jKGAuL3B1YmxpYy9hc3NldHMvJHtmfS8ke2ZvbGRlcn1gKS5zb3J0KHNvcnRpbmdBbGcpO1xyXG5cdH1cclxuXHRwb3puYXZhY2t5W2ZdID0gZmlsZXM7XHJcbn0pO1xyXG5cclxuLy8gY29uc3Qgcm9zdGxpbnkgPSBmcy5yZWFkZGlyU3luYyhwYXRoKS5zb3J0KChhLCBiKSA9PiBwYXJzZUludChhLnJlcGxhY2UoL1xcRC9nLCAnJykpIC0gcGFyc2VJbnQoYi5yZXBsYWNlQWxsKC9cXEQvZywgJycpKSk7XHJcbi8vIHBhdGggPSAnLi9wdWJsaWMvYXNzZXRzL2hvdWJ5JztcclxuLy8gY29uc3QgaG91YnkgPSBmcy5yZWFkZGlyU3luYyhwYXRoKS5zb3J0KChhLCBiKSA9PiB7XHJcbi8vIFx0aWYgKC9cXGQvLnRlc3QoYS5zbGljZSgwLCAzKSkgJiYgL1xcZC8udGVzdChiLnNsaWNlKDAsIDMpKSkge1xyXG4vLyBcdFx0cmV0dXJuIHBhcnNlSW50KGEucmVwbGFjZSgvXFxEL2csICcnKSkgLSBwYXJzZUludChiLnJlcGxhY2VBbGwoL1xcRC9nLCAnJykpO1xyXG4vLyBcdH1cclxuLy8gXHRyZXR1cm4gYSAtIGI7XHJcbi8vIH0pO1xyXG4vLyBwYXRoID0gJy4vcHVibGljL2Fzc2V0cy9wcnZvY2knO1xyXG4vLyBjb25zdCBwcnZvY2kgPSBmcy5yZWFkZGlyU3luYyhwYXRoKS5zb3J0KChhLCBiKSA9PiBwYXJzZUludChhLnJlcGxhY2UoL1xcRC9nLCAnJykpIC0gcGFyc2VJbnQoYi5yZXBsYWNlQWxsKC9cXEQvZywgJycpKSk7XHJcbi8vIHBhdGggPSAnLi9wdWJsaWMvYXNzZXRzL3Bydm91c3RpJztcclxuLy8gY29uc3QgcHJ2b3VzdGkgPSBmc1xyXG4vLyBcdC5yZWFkZGlyU3luYyhwYXRoKVxyXG4vLyBcdC5zb3J0KChhLCBiKSA9PiB7XHJcbi8vIFx0XHRpZiAoL1xcZC8udGVzdChhLnNsaWNlKDAsIDMpKSAmJiAvXFxkLy50ZXN0KGIuc2xpY2UoMCwgMykpKSB7XHJcbi8vIFx0XHRcdHJldHVybiBwYXJzZUludChhLnJlcGxhY2UoL1xcRC9nLCAnJykpIC0gcGFyc2VJbnQoYi5yZXBsYWNlQWxsKC9cXEQvZywgJycpKTtcclxuLy8gXHRcdH1cclxuLy8gXHRcdHJldHVybiBhIC0gYjtcclxuLy8gXHR9KVxyXG4vLyBcdC5maWx0ZXIoKGYpID0+ICFmLmVuZHNXaXRoKCcuZGInKSk7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG5cdHBsdWdpbnM6IFtyZWFjdCgpXSxcclxuXHRkZWZpbmU6IHtcclxuXHRcdF9fRElSX186IEpTT04uc3RyaW5naWZ5KHBvem5hdmFja3kpLFxyXG5cdH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW9QLE9BQU8sV0FBVztBQUN0USxPQUFPLFFBQVE7QUFDZixTQUFTLG9CQUFvQjtBQUc3QixJQUFJLGFBQWEsQ0FBQztBQUNsQixJQUFJLE9BQU87QUFDWCxJQUFNLE1BQU0sR0FBRyxZQUFZLElBQUksRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsU0FBUyxHQUFHLENBQUM7QUFFL0QsU0FBUyxXQUFXLEdBQUcsR0FBRztBQUN6QixNQUFJLEtBQUssS0FBSyxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUc7QUFDekQsV0FBTyxTQUFTLEVBQUUsUUFBUSxPQUFPLEVBQUUsQ0FBQyxJQUFJLFNBQVMsRUFBRSxXQUFXLE9BQU8sRUFBRSxDQUFDO0FBQUEsRUFDekU7QUFDQSxTQUFPLElBQUk7QUFDWjtBQUVBLElBQUksUUFBUSxDQUFDLE1BQU07QUFDbEIsU0FBTyxtQkFBbUIsQ0FBQztBQUMzQixRQUFNLFFBQVEsR0FBRyxZQUFZLElBQUksRUFBRSxLQUFLLFVBQVU7QUFDbEQsU0FBTyxNQUFNLEtBQUssQ0FBQ0EsT0FBTSxDQUFDQSxHQUFFLFNBQVMsR0FBRyxDQUFDLEdBQUc7QUFDM0MsUUFBSSxTQUFTLE1BQU0sS0FBSyxDQUFDQSxPQUFNLENBQUNBLEdBQUUsU0FBUyxHQUFHLENBQUM7QUFDL0MsUUFBSSxXQUFXLEdBQUcsWUFBWSxtQkFBbUIsQ0FBQyxJQUFJLE1BQU0sRUFBRSxFQUFFLEtBQUssVUFBVTtBQUFBLEVBQ2hGO0FBQ0EsYUFBVyxDQUFDLElBQUk7QUFDakIsQ0FBQztBQXdCRCxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMzQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsUUFBUTtBQUFBLElBQ1AsU0FBUyxLQUFLLFVBQVUsVUFBVTtBQUFBLEVBQ25DO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFsiZiJdCn0K
