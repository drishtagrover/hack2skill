export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: '#080810' }}>
      <img src="/assets/footer_shape.jpg" alt="" className="w-full object-cover opacity-60" style={{ maxHeight: 200 }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-gray-600 text-xs font-mono">© 2025 Hack2Skill. All rights reserved.</p>
      </div>
    </footer>
  );
}
