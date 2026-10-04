import { useEffect, useRef, useState } from 'react'
import './PersonalPortfolio.css'

const github = 'https://github.com/ronaelmoura'
const linkedin = 'https://www.linkedin.com/in/ronael-moura'
const desk = 'https://ronas-desk.onrender.com/'
const curriculum = '/curriculo-ronael-moura.pdf'

const images = {
  desk: 'https://raw.githubusercontent.com/ronaelmoura/ronas-desk/main/frontend/public/ronas-desk-linkedin-preview.png',
  nexo: 'https://raw.githubusercontent.com/ronaelmoura/nexo-dashboard-financeiro/main/public/og.png',
  climazen: 'https://raw.githubusercontent.com/ronaelmoura/climazen-landing-page/main/public/og.png',
}

const senaiModules = [
  ['Back-End', 164],
  ['Front-End', 140],
  ['Testes Back-End', 62],
  ['APIs', 60],
  ['Testes Front-End', 40],
  ['Framework + API', 40],
  ['Lógica', 40],
  ['Banco de Dados', 36],
]

const journey = [
  ['01', 'Suporte', 'Aprendi a investigar antes de tentar resolver.', 'Escuta, diagnóstico e responsabilidade pelo resultado.'],
  ['02', 'Formação', 'Transformei curiosidade em base técnica.', '670 horas de Programador Full-Stack no SENAI Piauí.'],
  ['03', 'Produto', 'Passei de exercícios para sistemas completos.', 'APIs, bancos, autenticação, testes, deploy e experiência de uso.'],
  ['04', 'Ronas Tech', 'Tecnologia aplicada fora do portfólio.', 'Sites, sistemas, automações e IA aplicada a problemas de negócios reais.'],
]

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function External({ href, children, className = '' }) {
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}<Arrow />
    </a>
  )
}

function useReveal() {
  useEffect(() => {
    const nodes = [...document.querySelectorAll('[data-reveal]')]
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced || !('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14, rootMargin: '0px 0px -5% 0px' },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])
}

export default function PersonalPortfolio() {
  const [menu, setMenu] = useState(false)
  const recruiterDialog = useRef(null)
  useReveal()

  return (
    <div className="folio">
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Ronael Moura — início">rm<span>.</span></a>
        <nav className={menu ? 'site-nav open' : 'site-nav'} aria-label="Navegação principal">
          <a href="#case" onClick={() => setMenu(false)}><span>01</span> Ronas Desk</a>
          <a href="#projetos" onClick={() => setMenu(false)}><span>02</span> Projetos</a>
          <a href="#trajetoria" onClick={() => setMenu(false)}><span>03</span> Trajetória</a>
          <a href="#contato" onClick={() => setMenu(false)}><span>04</span> Contato</a>
        </nav>
        <button className="recruiter-button" onClick={() => recruiterDialog.current?.showModal()}>
          Modo recrutador <Arrow />
        </button>
        <button
          className="menu-button"
          aria-label={menu ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menu}
          onClick={() => setMenu((value) => !value)}
        >
          {menu ? 'Fechar' : 'Menu'}
        </button>
      </header>

      <main id="conteudo">
        <section className="hero section-shell" id="inicio">
          <div className="hero-meta" data-reveal>
            <span>RONAEL MOURA / FULL STACK DEVELOPER</span>
            <span className="availability"><i /> Disponível para oportunidades remotas</span>
          </div>

          <div className="hero-grid">
            <div className="hero-copy" data-reveal>
              <p className="eyebrow">PROBLEMAS REAIS → PRODUTOS EM OPERAÇÃO</p>
              <h1>Eu transformo<br />problemas operacionais<br /><em>em produtos web.</em></h1>
              <p className="hero-intro">
                React, Node.js, APIs e MySQL com o olhar de quem veio do suporte:
                <strong> entender primeiro, construir com propósito e validar antes de entregar.</strong>
              </p>
              <div className="hero-actions">
                <a className="primary-link" href="#case">Ver meu principal case <span aria-hidden="true">↓</span></a>
                <External className="text-link" href={curriculum}>Currículo</External>
                <External className="text-link" href={github}>GitHub</External>
              </div>
              <div className="hero-stack" aria-label="Tecnologias principais">
                <span>React</span><span>Node.js</span><span>Express</span><span>MySQL</span><span>Docker</span>
              </div>
            </div>

            <div className="hero-product" data-reveal>
              <div className="product-window">
                <div className="window-top">
                  <span><i /><i /><i /></span>
                  <small>RONAS DESK / PRODUÇÃO</small>
                  <b>v1.0</b>
                </div>
                <img src={images.desk} alt="Dashboard real do Ronas Desk com indicadores de atendimento" />
                <span className="shot-note note-interface">React / interface</span>
                <span className="shot-note note-api">API REST / regras</span>
                <span className="shot-note note-data">MySQL / dados</span>
              </div>
              <p className="product-caption"><span>Projeto principal</span> Plataforma Full Stack de Help Desk criada a partir de um problema que eu conhecia de perto.</p>
            </div>
          </div>

          <div className="hero-foot" data-reveal>
            <span>ENTENDER</span><i />
            <span>CONSTRUIR</span><i />
            <span>VALIDAR</span><i />
            <span>ENTREGAR</span>
          </div>
        </section>

        <section className="story section-shell" aria-labelledby="story-title">
          <div className="story-grid">
            <div className="story-sticky" data-reveal>
              <span className="section-index">00 / COMO EU PENSO</span>
              <h2 id="story-title">Problema.<br />Engenharia.<br /><em>Produto.</em></h2>
              <p>O código é parte da entrega. O ponto de partida é descobrir o que precisa melhorar e por quê.</p>
            </div>

            <div className="story-steps">
              <article className="story-step" data-reveal>
                <span>01</span>
                <div>
                  <small>PROBLEMA</small>
                  <h3>Operação fragmentada.</h3>
                  <p>Chamados, clientes, equipe, SLA e indicadores precisam conversar entre si para o suporte não depender de memória ou planilhas espalhadas.</p>
                </div>
              </article>
              <article className="story-step" data-reveal>
                <span>02</span>
                <div>
                  <small>ENGENHARIA</small>
                  <h3>Regras antes de efeitos.</h3>
                  <p>Interface em React, API REST, autorização, histórico, banco relacional, testes e infraestrutura organizados em camadas com responsabilidades claras.</p>
                </div>
              </article>
              <article className="story-step product-step" data-reveal>
                <span>03</span>
                <div>
                  <small>PRODUTO</small>
                  <h3>Ronas Desk v1.0.</h3>
                  <p>Uma aplicação que pode ser aberta, testada e investigada no código — do portal do cliente ao deploy conteinerizado.</p>
                  <div className="inline-links">
                    <External href={desk}>Abrir demonstração</External>
                    <External href={`${github}/ronas-desk`}>Ver repositório</External>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="desk-case" id="case">
          <div className="section-shell">
            <div className="case-heading" data-reveal>
              <div>
                <span className="section-index">01 / CASE PRINCIPAL</span>
                <h2>Ronas Desk</h2>
              </div>
              <p>Um help desk construído da interface à infraestrutura, com foco em operação, rastreabilidade e segurança de acesso.</p>
            </div>

            <figure className="desk-shot" data-reveal>
              <img src={images.desk} alt="Tela real do Ronas Desk em funcionamento" />
              <figcaption>
                <span>PRODUTO REAL / DADOS DE DEMONSTRAÇÃO</span>
                <External href={desk}>Explorar aplicação</External>
              </figcaption>
            </figure>

            <div className="case-metrics" data-reveal>
              <div><strong>370</strong><span>testes automatizados</span><small>316 backend + 54 frontend</small></div>
              <div><strong>19</strong><span>sprints</span><small>evolução incremental do produto</small></div>
              <div><strong>v1.0</strong><span>em produção</span><small>demo segura e somente leitura</small></div>
            </div>

            <div className="architecture" data-reveal>
              <div className="architecture-copy">
                <span className="section-index">ARQUITETURA</span>
                <h3>Um produto.<br />Todas as camadas.</h3>
                <p>As decisões ficam visíveis para quem quer avaliar mais do que a interface.</p>
                <External className="text-link" href={`${github}/ronas-desk`}>Investigar no código</External>
              </div>
              <div className="architecture-layers">
                <article><span>01</span><div><strong>Experiência</strong><small>React · portal do cliente · dashboard</small></div><b>INTERFACE</b></article>
                <article><span>02</span><div><strong>Regras & acesso</strong><small>Express · JWT · perfis · SLA · histórico</small></div><b>API REST</b></article>
                <article><span>03</span><div><strong>Persistência</strong><small>MySQL · migrations · transações</small></div><b>DADOS</b></article>
                <article><span>04</span><div><strong>Entrega</strong><small>Docker · Nginx · Render · Aiven · Cloudinary</small></div><b>INFRA</b></article>
              </div>
            </div>

            <div className="quality" data-reveal>
              <div className="quality-copy">
                <span className="section-index">QUALIDADE</span>
                <h3>Qualidade não é um badge.</h3>
                <p>Os testes existem para permitir evolução com mais confiança, especialmente nas regras e fluxos que sustentam a operação.</p>
              </div>
              <div className="quality-bars">
                <div><span><b>Backend</b><small>316 testes</small></span><i style={{ '--value': '85%' }} /></div>
                <div><span><b>Frontend</b><small>54 testes</small></span><i style={{ '--value': '46%' }} /></div>
                <div className="quality-total"><strong>370</strong><span>testes automatizados no total</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="projects section-shell" id="projetos">
          <div className="section-heading" data-reveal>
            <div>
              <span className="section-index">02 / PROVAS DIFERENTES</span>
              <h2>Cada projeto prova<br /><em>uma habilidade.</em></h2>
            </div>
            <p>Em vez de repetir o mesmo CRUD quatro vezes, uso cada projeto para demonstrar uma dimensão diferente do trabalho.</p>
          </div>

          <article className="project-row stockflow" data-reveal>
            <div className="project-copy">
              <span className="project-number">02.1 / BACK-END & NEGÓCIO</span>
              <h3>StockFlow API</h3>
              <p className="project-lead">Estoque e pedidos com foco em consistência quando múltiplas operações disputam o mesmo recurso.</p>
              <p>Transações, <code>SELECT ... FOR UPDATE</code>, idempotência, máquina de estados, Outbox Pattern, RBAC, Zod, logs estruturados e contrato OpenAPI.</p>
              <div className="tag-list"><span>Node.js</span><span>TypeScript</span><span>Express 5</span><span>MySQL 8</span><span>OpenAPI</span></div>
              <div className="inline-links"><External href={`${github}/stockflow-api`}>Código e documentação</External></div>
            </div>
            <div className="api-flow" aria-label="Fluxo ilustrativo de uma confirmação de pedido">
              <div className="terminal-top"><span>POST /orders/:id/confirm</span><b>StockFlow</b></div>
              <div className="flow-line"><span>01</span><strong>Autenticação + RBAC</strong><i /></div>
              <div className="flow-line"><span>02</span><strong>Idempotency-Key</strong><i /></div>
              <div className="flow-line"><span>03</span><strong>SELECT ... FOR UPDATE</strong><i /></div>
              <div className="flow-line"><span>04</span><strong>Reserva + auditoria + Outbox</strong><i /></div>
              <div className="flow-result"><span>201</span><strong>Pedido confirmado</strong><small>ou 409 sem alterar o estoque</small></div>
            </div>
          </article>

          <article className="project-row nexo" data-reveal>
            <figure className="project-image">
              <img src={images.nexo} alt="Prévia real do dashboard financeiro Nexo" loading="lazy" />
              <figcaption>INTERFACE REAL / DADOS FICTÍCIOS</figcaption>
            </figure>
            <div className="project-copy">
              <span className="project-number">02.2 / DADOS & INTERFACE</span>
              <h3>Nexo</h3>
              <p className="project-lead">Dados financeiros precisam responder perguntas antes de impressionar visualmente.</p>
              <p>Dashboard responsivo com saldo, receitas, despesas, metas, filtros combináveis, busca em tempo real, modo escuro e lógica de agregação isolada e testada.</p>
              <div className="tag-list"><span>React 19</span><span>TypeScript</span><span>Recharts</span><span>Tailwind</span><span>Testes</span></div>
              <div className="inline-links">
                <External href="https://ronaelmoura.github.io/nexo-dashboard-financeiro/">Ver projeto</External>
                <External href={`${github}/nexo-dashboard-financeiro`}>Código</External>
              </div>
            </div>
          </article>

          <article className="project-row climazen" data-reveal>
            <div className="project-copy">
              <span className="project-number">02.3 / EXPERIÊNCIA & CONVERSÃO</span>
              <h3>ClimaZen</h3>
              <p className="project-lead">Tecnologia também precisa ser fácil de entender, usar e converter.</p>
              <p>Landing page comercial responsiva com simulador de economia, formulário de diagnóstico, FAQ interativo, navegação acessível, SEO e renderização estática.</p>
              <div className="tag-list"><span>React 19</span><span>UX/UI</span><span>Responsivo</span><span>SEO</span></div>
              <div className="inline-links">
                <External href="https://ronaelmoura.github.io/climazen-landing-page/">Ver projeto</External>
                <External href={`${github}/climazen-landing-page`}>Código</External>
              </div>
            </div>
            <figure className="project-image light-shot">
              <img src={images.climazen} alt="Prévia real da landing page ClimaZen" loading="lazy" />
              <figcaption>ENTREGA COMERCIAL / MARCA FICTÍCIA</figcaption>
            </figure>
          </article>

          <article className="ronas-tech-block" data-reveal>
            <div className="ronas-mark">RT<span>.</span></div>
            <div>
              <span className="project-number">02.4 / TECNOLOGIA & NEGÓCIO</span>
              <h3>Ronas Tech</h3>
              <p>Meu laboratório para transformar desenvolvimento, automação e IA aplicada em soluções para negócios reais — com identidade, produto e contato direto com quem precisa resolver o problema.</p>
              <div className="tag-list"><span>Sites</span><span>Sistemas</span><span>Automação</span><span>IA aplicada</span><span>Produto</span></div>
            </div>
            <div className="ronas-links">
              <External className="primary-link inverse" href="https://www.ronastech.com.br/">Conhecer a Ronas Tech</External>
              <External className="text-link" href={`${github}/ronas-tech-site`}>Ver código</External>
            </div>
          </article>
        </section>

        <section className="formation" id="trajetoria">
          <div className="section-shell">
            <div className="formation-grid">
              <div className="formation-copy" data-reveal>
                <span className="section-index">03 / FORMAÇÃO</span>
                <h2>Base técnica<br /><em>com prática.</em></h2>
                <p className="formation-title">Programador Full-Stack — SENAI Piauí</p>
                <div className="formation-meta"><strong>670h</strong><span>Out/2023 → Jan/2025</span><span>Conceito final: APTO</span></div>
                <p>A formação cobriu front-end, back-end, APIs, banco de dados, testes, versionamento, lógica de programação e metodologias ágeis.</p>
              </div>
              <div className="module-list" data-reveal>
                {senaiModules.map(([name, hours]) => (
                  <div key={name}>
                    <span>{name}</span>
                    <i><b style={{ '--module-width': `${Math.max(24, (hours / 164) * 100)}%` }} /></i>
                    <strong>{hours}h</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="journey-grid">
              <figure className="journey-photo" data-reveal>
                <img src="/ronael-moura.webp" alt="Ronael Moura" loading="lazy" />
                <figcaption><span>Ronael Moura</span><small>Do suporte de TI ao software.</small></figcaption>
              </figure>
              <div className="journey-copy" data-reveal>
                <span className="section-index">TRAJETÓRIA</span>
                <h2>Antes de escrever código,<br /><em>aprendi a ouvir.</em></h2>
                <p>Minha experiência com suporte continua presente no meu jeito de desenvolver: investigar o problema, reduzir ruído e assumir responsabilidade pela solução.</p>
                <div className="journey-list">
                  {journey.map(([number, title, statement, detail]) => (
                    <article key={number}>
                      <span>{number}</span>
                      <div><small>{title}</small><h3>{statement}</h3><p>{detail}</p></div>
                    </article>
                  ))}
                </div>
                <External className="text-link" href={linkedin}>Ver trajetória no LinkedIn</External>
              </div>
            </div>
          </div>
        </section>

        <section className="contact" id="contato">
          <div className="section-shell" data-reveal>
            <span className="section-index">04 / PRÓXIMA ENTREGA</span>
            <h2>Do produto à<br /><em>próxima oportunidade.</em></h2>
            <p>Busco uma oportunidade como Desenvolvedor Full Stack Júnior onde eu possa continuar construindo, aprendendo e entregando software que resolva problemas reais.</p>
            <div className="contact-actions">
              <a className="primary-link inverse" href="mailto:ronaelmoura240@gmail.com">Falar comigo <Arrow /></a>
              <External className="text-link" href={curriculum}>Currículo</External>
              <External className="text-link" href={linkedin}>LinkedIn</External>
              <External className="text-link" href={github}>GitHub</External>
            </div>
            <div className="contact-email">ronaelmoura240@gmail.com</div>
          </div>
        </section>
      </main>

      <footer className="footer section-shell">
        <a className="brand" href="#inicio">rm<span>.</span></a>
        <p>Ronael Moura · Desenvolvedor Full Stack Júnior</p>
        <span>© {new Date().getFullYear()}</span>
        <a href="#inicio">Voltar ao topo ↑</a>
      </footer>

      <dialog
        ref={recruiterDialog}
        className="recruiter-dialog"
        onClick={(event) => {
          if (event.target === event.currentTarget) recruiterDialog.current?.close()
        }}
      >
        <div className="dialog-top">
          <span>RESUMO PARA RECRUTAMENTO</span>
          <button onClick={() => recruiterDialog.current?.close()} aria-label="Fechar resumo">✕</button>
        </div>
        <h2>Ronael Moura<small>Desenvolvedor Full Stack Júnior</small></h2>
        <p>React, Node.js, Express e MySQL. Qualificação Profissional em Programador Full-Stack pelo SENAI Piauí, com 670 horas, e experiência prática criando produtos web completos.</p>
        <div className="dialog-proof">
          <div><strong>Ronas Desk</strong><span>v1.0 em produção</span></div>
          <div><strong>370 testes</strong><span>316 backend + 54 frontend</span></div>
          <div><strong>Stack</strong><span>React · Node · MySQL · Docker</span></div>
        </div>
        <div className="dialog-actions">
          <External className="primary-link" href={curriculum}>Abrir currículo</External>
          <External className="text-link" href={desk}>Ver Ronas Desk</External>
        </div>
        <a className="dialog-email" href="mailto:ronaelmoura240@gmail.com">ronaelmoura240@gmail.com ↗</a>
      </dialog>
    </div>
  )
}
