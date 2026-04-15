const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3000';
const stamp = Date.now();
const results = [];

async function req(path, method = 'GET', body) {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  let json = {};
  try {
    json = await res.json();
  } catch {
    json = {};
  }
  return { ok: res.ok, status: res.status, json };
}

function pickId(payload) {
  if (!payload) return null;
  if (typeof payload.id === 'number') return payload.id;
  if (Array.isArray(payload?.data) && payload.data[0]?.id) return payload.data[0].id;
  if (payload?.data?.id) return payload.data.id;
  return null;
}

function log(name, ok, detail = '') {
  results.push({ name, ok, detail });
  const icon = ok ? 'PASS' : 'FAIL';
  console.log(`${icon}: ${name}${detail ? ` -> ${detail}` : ''}`);
}

async function testCrud(name, route, createBody, updateBody) {
  const created = await req(route, 'POST', createBody);
  const id = pickId(created.json);
  log(`${name} create`, created.ok && !!id, `status ${created.status}`);
  if (!created.ok || !id) return;

  const updated = await req(`${route}/${id}`, 'PUT', updateBody);
  log(`${name} update`, updated.ok, `status ${updated.status}`);

  const deleted = await req(`${route}/${id}`, 'DELETE');
  log(`${name} delete`, deleted.ok, `status ${deleted.status}`);
}

async function testSingletons() {
  const companyGet = await req('/api/admin/company');
  if (!companyGet.ok || !companyGet.json?.data) {
    log('company fetch', false, `status ${companyGet.status}`);
  } else {
    const original = companyGet.json.data;
    const changed = { ...original, tagline: `${original.tagline || 'Tagline'} [smoke]` };
    const update = await req('/api/admin/company', 'PUT', changed);
    log('company update', update.ok, `status ${update.status}`);
    await req('/api/admin/company', 'PUT', {
      name: original.name,
      tagline: original.tagline,
      description: original.description,
      mission: original.mission,
    });
  }

  const contactGet = await req('/api/admin/contact');
  if (!contactGet.ok || !contactGet.json?.data) {
    log('contact fetch', false, `status ${contactGet.status}`);
  } else {
    const original = contactGet.json.data;
    const socialLinks = original.social_links || [];
    const changed = {
      phone: original.phone,
      email: original.email,
      address: original.address,
      address_link: original.address_link,
      social_links: socialLinks,
    };
    const update = await req('/api/admin/contact', 'PUT', changed);
    log('contact update', update.ok, `status ${update.status}`);
  }
}

async function testChildren() {
  const pkg = await req('/api/admin/packages', 'POST', {
    title: `Smoke Package ${stamp}`,
    location: 'Test',
    duration: '1 day',
    price: '1',
    price_value: 1,
    description: 'smoke',
    short_description: 'smoke',
    image: '/assets/images/galleryBg.png',
    category: 'test',
  });
  const pkgId = pickId(pkg.json);
  log('package parent create', pkg.ok && !!pkgId, `status ${pkg.status}`);
  if (pkg.ok && pkgId) {
    const h = await req(`/api/admin/packages/${pkgId}/highlights`, 'POST', { highlight: 'smoke highlight' });
    const hId = pickId(h.json);
    log('package highlight create', h.ok && !!hId, `status ${h.status}`);
    if (hId) {
      log('package highlight update', (await req(`/api/admin/packages/${pkgId}/highlights/${hId}`, 'PUT', { highlight: 'updated' })).ok);
      log('package highlight delete', (await req(`/api/admin/packages/${pkgId}/highlights/${hId}`, 'DELETE')).ok);
    }

    const i = await req(`/api/admin/packages/${pkgId}/inclusions`, 'POST', { inclusion: 'smoke inclusion' });
    const iId = pickId(i.json);
    log('package inclusion create', i.ok && !!iId, `status ${i.status}`);
    if (iId) {
      log('package inclusion update', (await req(`/api/admin/packages/${pkgId}/inclusions/${iId}`, 'PUT', { inclusion: 'updated' })).ok);
      log('package inclusion delete', (await req(`/api/admin/packages/${pkgId}/inclusions/${iId}`, 'DELETE')).ok);
    }

    const t = await req(`/api/admin/packages/${pkgId}/itinerary`, 'POST', { day: 1, title: 'smoke day', details: 'details' });
    const tId = pickId(t.json);
    log('package itinerary create', t.ok && !!tId, `status ${t.status}`);
    if (tId) {
      log('package itinerary update', (await req(`/api/admin/packages/${pkgId}/itinerary/${tId}`, 'PUT', { day: 2, title: 'updated', details: 'updated' })).ok);
      log('package itinerary delete', (await req(`/api/admin/packages/${pkgId}/itinerary/${tId}`, 'DELETE')).ok);
    }

    await req(`/api/admin/packages/${pkgId}`, 'DELETE');
  }

  const loc = await req('/api/admin/locations', 'POST', {
    name: `Smoke Location ${stamp}`,
    subtitle: 's',
    altitude: '1m',
    distance_from_srinagar: '1km',
    description: 'd',
    long_description: 'ld',
    best_time: 'any',
    image: '/assets/images/galleryBg.png',
  });
  const locId = pickId(loc.json);
  log('location parent create', loc.ok && !!locId, `status ${loc.status}`);
  if (loc.ok && locId) {
    const h = await req(`/api/admin/locations/${locId}/highlights`, 'POST', { highlight: 'smoke highlight' });
    const hId = pickId(h.json);
    log('location highlight create', h.ok && !!hId, `status ${h.status}`);
    if (hId) {
      log('location highlight update', (await req(`/api/admin/locations/${locId}/highlights/${hId}`, 'PUT', { highlight: 'updated' })).ok);
      log('location highlight delete', (await req(`/api/admin/locations/${locId}/highlights/${hId}`, 'DELETE')).ok);
    }

    const b = await req(`/api/admin/locations/${locId}/best-for`, 'POST', { tag: 'couples' });
    const bId = pickId(b.json);
    log('location best-for create', b.ok && !!bId, `status ${b.status}`);
    if (bId) {
      log('location best-for update', (await req(`/api/admin/locations/${locId}/best-for/${bId}`, 'PUT', { tag: 'families' })).ok);
      log('location best-for delete', (await req(`/api/admin/locations/${locId}/best-for/${bId}`, 'DELETE')).ok);
    }

    const w = await req(`/api/admin/locations/${locId}/what-to-see`, 'POST', { title: 'spot', image: '/assets/images/galleryBg.png', description: 'desc' });
    const wId = pickId(w.json);
    log('location what-to-see create', w.ok && !!wId, `status ${w.status}`);
    if (wId) {
      log('location what-to-see update', (await req(`/api/admin/locations/${locId}/what-to-see/${wId}`, 'PUT', { title: 'updated', image: '/assets/images/galleryBg.png', description: 'updated' })).ok);
      log('location what-to-see delete', (await req(`/api/admin/locations/${locId}/what-to-see/${wId}`, 'DELETE')).ok);
    }

    await req(`/api/admin/locations/${locId}`, 'DELETE');
  }

  const team = await req('/api/admin/team', 'POST', { name: `Smoke Member ${stamp}`, role: 'Tester', bio: 'bio', photo: '' });
  const teamId = pickId(team.json);
  log('team parent create', team.ok && !!teamId, `status ${team.status}`);
  if (team.ok && teamId) {
    const s = await req(`/api/admin/team/${teamId}/socials`, 'POST', { platform: 'instagram', url: 'https://instagram.com/smoke' });
    const sId = pickId(s.json);
    log('team social create', s.ok && !!sId, `status ${s.status}`);
    if (sId) {
      log('team social update', (await req(`/api/admin/team/${teamId}/socials/${sId}`, 'PUT', { platform: 'facebook', url: 'https://facebook.com/smoke' })).ok);
      log('team social delete', (await req(`/api/admin/team/${teamId}/socials/${sId}`, 'DELETE')).ok);
    }
    await req(`/api/admin/team/${teamId}`, 'DELETE');
  }
}

async function run() {
  await testSingletons();

  await testCrud('services', '/api/admin/services',
    { title: `Smoke Service ${stamp}`, description: 'smoke', icon: 'package' },
    { title: `Smoke Service ${stamp} updated`, description: 'updated', icon: 'map' });

  await testCrud('why choose us', '/api/admin/why-choose-us',
    { title: `Smoke Why ${stamp}`, description: 'smoke', icon: 'shield' },
    { title: `Smoke Why ${stamp} updated`, description: 'updated', icon: 'users' });

  await testCrud('testimonials', '/api/admin/testimonials',
    { name: `Smoke User ${stamp}`, review: 'great', location: 'test', rating: 5 },
    { name: `Smoke User ${stamp} updated`, review: 'updated', location: 'test2', rating: 4 });

  await testCrud('faqs', '/api/admin/faqs',
    { question: `Smoke question ${stamp}?`, answer: 'Smoke answer' },
    { question: `Smoke question ${stamp} updated?`, answer: 'Updated answer' });

  await testCrud('site-images', '/api/admin/site-images',
    { key: `smoke-${stamp}`, url: '/assets/images/galleryBg.png' },
    { key: `smoke-${stamp}-up`, url: '/assets/images/galleryBg.png' });

  await testCrud('gallery', '/api/admin/gallery',
    { title: `Smoke gallery ${stamp}`, location: 'test', description: 'desc', image: '/assets/images/galleryBg.png', created_date: '2026-01-01' },
    { title: `Smoke gallery ${stamp} updated`, location: 'test2', description: 'updated', image: '/assets/images/galleryBg.png', created_date: '2026-01-02' });

  await testCrud('company-stats', '/api/admin/company-stats',
    { company_id: 1, value: '123', label: `Smoke Stat ${stamp}` },
    { company_id: 1, value: '456', label: `Smoke Stat ${stamp} updated` });

  await testChildren();

  const failed = results.filter((r) => !r.ok);
  console.log('\n==== SUMMARY ====');
  console.log(`Total: ${results.length}, Passed: ${results.length - failed.length}, Failed: ${failed.length}`);
  if (failed.length) {
    for (const f of failed) console.log(` - ${f.name}: ${f.detail}`);
    process.exit(1);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
