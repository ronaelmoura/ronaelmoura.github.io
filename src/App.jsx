import { useEffect, useState } from 'react'
import favicon from '../assets/favicon.png'
import portrait from '../assets/ronael-moura.webp'

const links = [
  ['Ronas Desk', 'ronas-desk'], ['Sobre', 'sobre'], ['Stack', 'stack'],
  ['Processo', 'processo'], ['Jornada', 'jornada'], ['Contato', 'contato'],
]

const features = [
  { icon: '01', title: 'Gestão de clientes', text: 'Cadastro, edição, pesquisa e controle de situação ativa ou inativa.' },
  { icon: '02', title: 'Gestão de chamados', text: 'Categorias, prioridades e status para acompanhar cada atendimento.' },
  { icon: '03', title: 'Histórico conectado', text: 'Clientes vinculados aos chamados, com contexto completo do suporte.' },
  { icon: '04', title: 'Dashboard operacional', text: 'Indicadores de chamados abertos, em andamento e concluídos.' },
  { icon: '05', title: 'API REST', text: 'Camada de serviços em Node.js e Express para uma integração consistente.' },
  { icon: '06', title: 'Dados persistentes', text: 'Modelagem em MySQL pensada para integridade e evolução do produto.' },
]

const roadmap = [
  { version: 'v0.8', state: 'Agora', title: 'Base operacional', text: 'CRUD de clientes e chamados, vínculos, filtros e histórico por cliente.', active: true },
  { version: 'v0.9', state: 'Próximo', title: 'Controle e produtividade', text: 'Autenticação JWT, gestão de técnicos, anexos e dashboard avançado.' },
  { version: 'v1.0', state: 'Lançamento', title: 'Produto completo', text: 'Relatórios, refinamento de testes, experiência final e deploy.' },
]

const techGroups = [
  { eyebrow: 'Interface', icon: '◫', title: 'Front-End', text: 'Experiências rápidas, acessíveis e responsivas.', items: ['React', 'Vite', 'JavaScript', 'HTML5', 'CSS3'] },
  { eyebrow: 'Serviços', icon: '⌁', title: 'Back-End', text: 'APIs organizadas e regras de negócio bem definidas.', items: ['Node.js', 'Express', 'REST API', 'JSON', 'npm'] },
  { eyebrow: 'Persistência', icon: '◉', title: 'Dados & Qualidade', text: 'Dados consistentes, validação e confiança na entrega.', items: ['MySQL', 'SQL', 'Postman', 'Testes', 'Documentação'] },
  { eyebrow: 'Entrega', icon: '⌘', title: 'Workflow', text: 'Da ideia ao software publicado e versionado.', items: ['Git', 'GitHub', 'VS Code', 'Figma', 'Deploy'] },
]

const process = [
  ['01', 'Planejamento', 'Entendo o problema, o usuário e o resultado esperado.'],
  ['02', 'Arquitetura', 'Defino dados, componentes, integrações e responsabilidades.'],
  ['03', 'Desenvolvimento', 'Construo em ciclos pequenos, claros e rastreáveis.'],
  ['04', 'Testes', 'Valido fluxos, erros, responsividade e casos importantes.'],
  ['05', 'Code Review', 'Reviso legibilidade, consistência e oportunidades de simplificar.'],
  ['06', 'Git', 'Registro a evolução com commits objetivos e histórico organizado.'],
  ['07', 'Deploy', 'Publico, verifico o ambiente real e acompanho a entrega.'],
  ['08', 'Melhoria contínua', 'Coleto aprendizados e evoluo produto, código e processo.'],
]

function Arrow() { return <span aria-hidden="true">↗</span> }

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <header className={`header ${scrolled ? 'scrolled' : ''}`}>
    <div className="nav-wrap">
      <a className="brand" href="#inicio" aria-label="Ronas Tech — início">
        <img src={favicon} alt="" /><span><strong>RONAS</strong> TECH</span>
      </a>
      <nav className="nav-desktop" aria-label="Navegação principal">
        {links.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>
      <a className="nav-cta" href="#contato">Vamos conversar <Arrow /></a>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Fechar menu' : 'Abrir menu'}>
        <span /><span /><span />
      </button>
    </div>
    <nav className={`nav-mobile ${open ? 'open' : ''}`} aria-label="Navegação móvel">
      {links.map(([label, id]) => <a key={id} onClick={() => setOpen(false)} href={`#${id}`}>{label}</a>)}
    </nav>
  </header>
}

function SectionHead({ tag, title, text }) {
  return <div className="section-head reveal">
    <p className="eyebrow"><span />{tag}</p><h2>{title}</h2>{text && <p className="section-lead">{text}</p>}
  </div>
}

function App() {
  useEffect(() => {
    const targets = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) }
    }), { threshold: .1 })
    targets.forEach(target => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <div className="ambient" aria-hidden="true" />
    <Header />
    <main id="conteudo">
      <section className="hero" id="inicio">
        <div className="hero-grid">
          <div className="hero-copy reveal visible">
            <div className="status-pill"><i /> Disponível para oportunidades</div>
            <p className="eyebrow"><span /> DESENVOLVEDOR FULL STACK</p>
            <h1>Eu transformo <em>problemas reais</em> em software que funciona.</h1>
            <p className="hero-lead">Sou <strong>Ronael Moura</strong>. Construo aplicações completas com React, Node.js e uma visão prática de produto — da arquitetura ao deploy.</p>
            <div className="actions">
              <a className="button primary" href="#ronas-desk">Conhecer o Ronas Desk <Arrow /></a>
              <a className="button secondary" href="https://github.com/ronaelmoura" target="_blank" rel="noreferrer">Ver GitHub <Arrow /></a>
            </div>
            <div className="proof">
              <div><strong>670h</strong><span>Formação Full Stack</span></div>
              <div><strong>React + Node</strong><span>Produto ponta a ponta</span></div>
              <div><strong>Em evolução</strong><span>Aprendizado público</span></div>
            </div>
          </div>
          <div className="hero-art reveal visible">
            <div className="portrait-frame">
              <span className="frame-label">RONAEL_MOURA / 2026</span>
              <img src={portrait} alt="Ronael Moura, Desenvolvedor Full Stack" width="1100" height="1100" />
              <div className="code-card"><i /> <span>BUILDING NOW</span><strong>Ronas Desk v0.8</strong></div>
              <div className="stack-float"><span>REACT</span><b>+</b><span>NODE.JS</span></div>
            </div>
          </div>
        </div>
        <a className="scroll-cue" href="#ronas-desk"><span /> Explore o projeto principal</a>
      </section>

      <section className="project-hero" id="ronas-desk">
        <div className="container">
          <div className="project-heading reveal">
            <div><p className="eyebrow"><span /> PROJETO PRINCIPAL · EM DESENVOLVIMENTO</p><h2>Ronas <em>Desk</em></h2></div>
            <p>Um sistema Full Stack de gerenciamento de chamados técnicos, criado para transformar rotinas de suporte em um fluxo simples, rastreável e eficiente.</p>
          </div>
          <div className="desk-showcase reveal">
            <div className="app-window">
              <div className="window-bar"><div><i /><i /><i /></div><span>app.ronasdesk.local/dashboard</span><small>● Seguro</small></div>
              <div className="app-layout">
                <aside><div className="app-logo">R<span>D</span></div>{['▦', '◫', '◎', '▤', '⚙'].map((x,i)=><b className={i===0?'active':''} key={i}>{x}</b>)}</aside>
                <div className="dashboard">
                  <div className="dash-top"><div><small>VISÃO GERAL</small><h3>Central de suporte</h3></div><button>+ Novo chamado</button></div>
                  <div className="dash-stats"><div><span>Total</span><strong>48</strong><i>+12%</i></div><div><span>Em aberto</span><strong>12</strong><i>Agora</i></div><div><span>Em andamento</span><strong>08</strong><i>Ativos</i></div><div><span>Concluídos</span><strong>28</strong><i>58%</i></div></div>
                  <div className="dash-bottom"><div className="chart"><span>Chamados da semana</span><div className="bars">{[38,58,42,76,64,92,55].map((h,i)=><i key={i} style={{height:`${h}%`}} />)}</div></div><div className="recent"><span>Atividade recente</span>{['Falha no acesso', 'Configurar estação', 'Atualização concluída'].map((x,i)=><p key={x}><i className={`priority p${i}`} />{x}<small>{i+1}h</small></p>)}</div></div>
                </div>
              </div>
            </div>
            <div className="showcase-copy">
              <span className="version">VERSÃO ATUAL · v0.8</span>
              <h3>Mais que um CRUD.<br />Um produto em evolução.</h3>
              <p>O Ronas Desk simula um ambiente real de Help Desk e concentra a evolução técnica de Ronael: interface, API, regras de negócio, banco de dados e decisões de produto.</p>
              <ul><li>React + Vite no front-end</li><li>Node.js + Express na API REST</li><li>MySQL para persistência de dados</li><li>Arquitetura em camadas</li></ul>
              <a className="button primary" href="https://github.com/ronaelmoura/ronas-desk" target="_blank" rel="noreferrer">Explorar repositório <Arrow /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="section features">
        <div className="container"><SectionHead tag="FUNCIONALIDADES" title="Tudo o que o suporte precisa. Em um só fluxo." text="Cada módulo nasce de uma necessidade real e se conecta ao restante do produto." />
          <div className="feature-grid">{features.map((item, index) => <article className="feature-card reveal" key={item.title}><div><span>{item.icon}</span><i>0{index+1}</i></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        </div>
      </section>

      <section className="section roadmap-section">
        <div className="container"><SectionHead tag="ROADMAP" title="Construindo em público. Evoluindo com propósito." />
          <div className="roadmap reveal">{roadmap.map(item => <article className={item.active ? 'active' : ''} key={item.version}><div className="road-dot" /><div className="road-meta"><strong>{item.version}</strong><span>{item.state}</span></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
          <p className="road-note reveal">Roadmap vivo: prioridades podem evoluir conforme testes, feedback e aprendizado do produto.</p>
        </div>
      </section>

      <section className="section about" id="sobre">
        <div className="container about-grid">
          <div className="about-title reveal"><p className="eyebrow"><span /> SOBRE MIM</p><h2>Técnica para construir.<br /><em>Curiosidade para evoluir.</em></h2></div>
          <div className="about-copy reveal"><p className="large">Sou um Desenvolvedor Full Stack que acredita que a melhor forma de aprender é <strong>construindo, documentando e compartilhando.</strong></p><p>Minha experiência em suporte de TI me ensinou a ouvir, investigar e resolver. Hoje levo esse olhar para o desenvolvimento de interfaces, APIs e produtos digitais completos.</p><p>Na <strong>Ronas Tech</strong>, transformo erros e aprendizados reais em conteúdo técnico direto. No <strong>Ronas Desk</strong>, aplico essa evolução em um produto com propósito.</p>
            <div className="about-links"><a href="https://www.linkedin.com/in/ronael-moura" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a href="https://www.youtube.com/@RonasTech" target="_blank" rel="noreferrer">Canal Ronas Tech <Arrow /></a></div>
          </div>
        </div>
      </section>

      <section className="section stack" id="stack">
        <div className="container"><SectionHead tag="TECNOLOGIAS" title="Uma stack moderna para produtos completos." text="Ferramentas escolhidas para criar soluções úteis, legíveis e prontas para evoluir." />
          <div className="tech-grid">{techGroups.map(group => <article className="tech-card reveal" key={group.title}><div className="tech-icon">{group.icon}</div><small>{group.eyebrow}</small><h3>{group.title}</h3><p>{group.text}</p><div>{group.items.map(x=><span key={x}>{x}</span>)}</div></article>)}</div>
        </div>
      </section>

      <section className="section process-section" id="processo">
        <div className="container"><SectionHead tag="COMO EU DESENVOLVO SOFTWARE" title="Processo claro. Decisões conscientes. Evolução contínua." />
          <div className="process-grid">{process.map(([n,title,text])=><article className="process-card reveal" key={n}><span>{n}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
        </div>
      </section>

      <section className="section journey" id="jornada">
        <div className="container"><SectionHead tag="MINHA JORNADA" title="Da curiosidade ao desenvolvimento de produtos reais." text="Uma trajetória construída entre formação, suporte, prática constante e compartilhamento de conhecimento." />
          <div className="journey-grid reveal">
            <div className="journey-line" />
            <article><span>01</span><small>BASE TÉCNICA</small><h3>Suporte em TI</h3><p>Manutenção de computadores, atendimento a usuários e solução de problemas: a base para entender tecnologia pela perspectiva de quem usa.</p></article>
            <article><span>02</span><small>FORMAÇÃO</small><h3>Full Stack no SENAI</h3><p>670 horas de formação, conceito final APTO e fundamentos sólidos de front-end, back-end, APIs, banco de dados, testes e versionamento.</p></article>
            <article><span>03</span><small>CONSTRUÇÃO PÚBLICA</small><h3>Ronas Tech</h3><p>Projetos no GitHub, portfólio e tutoriais que transformam desafios de npm, Node.js, Git e Windows em conhecimento compartilhado.</p></article>
            <article><span>04</span><small>PRODUTO AUTORAL</small><h3>Ronas Desk</h3><p>O passo seguinte: reunir interface, arquitetura, API e dados em uma aplicação Full Stack pensada como produto real.</p></article>
          </div>
        </div>
      </section>

      <section className="section credentials">
        <div className="container"><SectionHead tag="FORMAÇÃO & CERTIFICADOS" title="Conhecimento validado. Prática em movimento." />
          <div className="cert-grid">
            <article className="cert-main reveal"><div className="seal">S<span>✓</span></div><div><span className="cert-tag">CERTIFICADO PRINCIPAL</span><p>SENAI PIAUÍ · 670 HORAS · CONCEITO APTO</p><h3>Programador<br />Full Stack</h3><ul><li>Desenvolvimento Front-End</li><li>Desenvolvimento Back-End</li><li>APIs, dados, testes e Git</li></ul></div><strong className="cert-year">2025</strong></article>
            <div className="cert-side"><article className="reveal"><span>02</span><div><small>FORMAÇÃO COMPLEMENTAR</small><h3>Técnico em Suporte em TI</h3><p>Infraestrutura, manutenção e atendimento ao usuário.</p></div></article><article className="reveal"><span>03</span><div><small>PRODUTIVIDADE</small><h3>Pacote Office Completo</h3><p>Ferramentas para documentação, análise e comunicação.</p></div></article></div>
          </div>
        </div>
      </section>

      <section className="section other-projects">
        <div className="container"><SectionHead tag="OUTROS PROJETOS" title="Aprendizado transformado em entregas." />
          <div className="other-grid">
            <article className="reveal"><span>01 · DEBUGGING</span><h3>Laboratório ERESOLVE npm</h3><p>Conflito real de dependências reproduzido, investigado e documentado passo a passo.</p><div><b>Node.js</b><b>npm</b><b>Documentação</b></div><a href="https://github.com/ronaelmoura/laboratorio-erro-eresolve-npm" target="_blank" rel="noreferrer">Ver código <Arrow /></a></article>
            <article className="reveal"><span>02 · PRODUTO DIGITAL</span><h3>Ronas Tech Site</h3><p>Site institucional para apresentar serviços de desenvolvimento, sistemas web e soluções digitais.</p><div><b>React</b><b>Vite</b><b>CSS</b></div><a href="https://ronas-tech-site.vercel.app/" target="_blank" rel="noreferrer">Visitar projeto <Arrow /></a></article>
            <article className="reveal"><span>03 · PORTFÓLIO</span><h3>Portfólio Ronas Tech</h3><p>Esta experiência: identidade profissional, performance e narrativa construídas em React.</p><div><b>React</b><b>UX/UI</b><b>SEO</b></div><a href="https://github.com/ronaelmoura/ronaelmoura.github.io" target="_blank" rel="noreferrer">Ver repositório <Arrow /></a></article>
          </div>
        </div>
      </section>

      <section className="contact" id="contato"><div className="container"><div className="contact-card reveal"><p className="eyebrow"><span /> PRÓXIMO DESAFIO</p><h2>Vamos transformar uma ideia em <em>software real?</em></h2><p>Estou aberto a oportunidades como Desenvolvedor Full Stack, colaborações e projetos que gerem impacto.</p><div className="actions"><a className="button light" href="mailto:ronaelmoura240@gmail.com">Enviar um e-mail <Arrow /></a><a className="button outline" href="https://www.linkedin.com/in/ronael-moura" target="_blank" rel="noreferrer">Conectar no LinkedIn <Arrow /></a></div></div></div></section>
    </main>
    <footer><div className="container footer-grid"><a className="brand" href="#inicio"><img src={favicon} alt="" /><span><strong>RONAS</strong> TECH</span></a><p>Desenvolvido com foco, prática e evolução.</p><div><a href="https://github.com/ronaelmoura" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/ronael-moura" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://www.youtube.com/@RonasTech" target="_blank" rel="noreferrer">YouTube</a><a href="#inicio">Topo ↑</a></div><small>© {new Date().getFullYear()} Ronael Moura. Todos os direitos reservados.</small></div></footer>
  </>
}

export default App
