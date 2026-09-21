window.dataLayer = window.dataLayer || [];

function trackEvent(name, params = {}) {
  window.dataLayer.push({event:name, ...params});
  if (typeof gtag === 'function') {
    try { gtag('event', name, params); } catch(e) {}
  }
  console.log('[Analytics Event]', name, params);
}

const PRODUCTS = {
  "NSP-1001": {id:"NSP-1001", name:"Northstar Trail Pack", category:"Backpacks", price:79.99, icon:"🎒"},
  "NSB-2001": {id:"NSB-2001", name:"Summit Bottle", category:"Hydration", price:24.99, icon:"🧴"},
  "NSJ-3001": {id:"NSJ-3001", name:"Ridgeline Jacket", category:"Apparel", price:129.99, icon:"🧥"},
  "NSL-4001": {id:"NSL-4001", name:"Camp Lantern", category:"Camping", price:44.99, icon:"🏮"}
};

function money(n){ return '$' + Number(n).toFixed(2); }
function getCart(){ return JSON.parse(localStorage.getItem('northstarCart') || '[]'); }
function saveCart(cart){ localStorage.setItem('northstarCart', JSON.stringify(cart)); updateCartCount(); }
function updateCartCount(){
  const count = getCart().reduce((sum,i)=>sum+i.qty,0);
  document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
}
function addToCart(productId, qty=1){
  const cart = getCart();
  const existing = cart.find(i=>i.id===productId);
  if(existing) existing.qty += qty;
  else cart.push({id:productId, qty:qty});
  saveCart(cart);
  const p = PRODUCTS[productId];
  trackEvent('add_to_cart',{
    currency:'USD',
    value:p.price*qty,
    items:[{item_id:p.id,item_name:p.name,item_category:p.category,price:p.price,quantity:qty}]
  });
}
function removeFromCart(productId){
  const cart = getCart().filter(i=>i.id!==productId);
  saveCart(cart);
  trackEvent('remove_from_cart',{item_id:productId});
}
function clearCart(){ localStorage.removeItem('northstarCart'); updateCartCount(); }

function analyticsItem(p, qty=1){
  return {item_id:p.id,item_name:p.name,item_category:p.category,price:p.price,quantity:qty};
}

document.addEventListener('DOMContentLoaded',()=>{
  updateCartCount();

  document.querySelectorAll('[data-track]').forEach(el=>{
    el.addEventListener('click',()=>{
      trackEvent(el.dataset.track,{
        link_text:(el.innerText||'').trim(),
        link_url:el.href||'',
        page_location:location.href
      });
    });
  });

  document.querySelectorAll('[data-add-to-cart]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const id=btn.dataset.addToCart;
      addToCart(id,1);
      const original=btn.textContent;
      btn.textContent='Added ✓';
      setTimeout(()=>btn.textContent=original,900);
    });
  });

  document.querySelectorAll('[data-select-item]').forEach(el=>{
    el.addEventListener('click',()=>{
      const p=PRODUCTS[el.dataset.selectItem];
      if(p) trackEvent('select_item',{item_list_name:'Product Listing',items:[analyticsItem(p)]});
    });
  });

  const newsletter = document.getElementById('newsletterForm');
  if(newsletter){
    newsletter.addEventListener('submit',e=>{
      e.preventDefault();
      const email = newsletter.querySelector('input[type=email]').value;
      trackEvent('generate_lead',{form_name:'newsletter_signup',lead_type:'newsletter'});
      newsletter.innerHTML='<div class="success">Thanks! You are signed up for demo emails.</div>';
    });
  }
});
