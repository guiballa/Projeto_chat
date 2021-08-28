import org.apache.zookeeper.*;
import org.apache.zookeeper.data.Stat;

import static java.util.Collections.sort;
import static org.apache.zookeeper.Watcher.Event.EventType.None;

import java.io.IOException;
import java.util.List;

public class EleicaoDeLider {

    private static final String HOST = "localhost";
    private static final String PORTA = "2181";
    private static final int TIMEOUT = 5000;
    private static final String NAMESPACE_ELEICAO = "/eleicao";
    private static final String ZNODE_TESTE_WATCH = "/teste_watch";
    private String nomeDoZNodeDesseProcesso;
    private ZooKeeper zooKeeper;

    public static void main(String[] args) throws IOException, InterruptedException, KeeperException {
        System.out.println("Método main:" + Thread.currentThread().getName());
        EleicaoDeLider eleicaoDeLider = new EleicaoDeLider();
        eleicaoDeLider.conectar();
        eleicaoDeLider.realizarCandidatura();
        eleicaoDeLider.elegerLider();
        eleicaoDeLider.registrarWatcher();
        eleicaoDeLider.executar();
        eleicaoDeLider.fechar();
    }

    private class TesteWatcher implements Watcher{

        @Override
        public void process(WatchedEvent event) {
            System.out.println(event);
            switch (event.getType()){
                case NodeCreated:
                    System.out.println("ZNode criado");
                    break;
                case NodeDeleted:
                    System.out.println("ZNode removido");
                    break;
            }
        }
    }

    public void registrarWatcher() throws KeeperException, InterruptedException {
        TesteWatcher watcher = new TesteWatcher();
        Stat stat = zooKeeper.exists(ZNODE_TESTE_WATCH, watcher);
        //Znode existe
        if(stat != null){

        }
    }

    public void realizarCandidatura () throws KeeperException, InterruptedException {
        String prefix = String.format("%s/cand_", NAMESPACE_ELEICAO);
        String pathInteiro = zooKeeper.create(prefix, new byte[]{}, ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.EPHEMERAL_SEQUENTIAL);
        this.nomeDoZNodeDesseProcesso = pathInteiro.replace(String.format("%s/",NAMESPACE_ELEICAO),"");
        System.out.println(this.nomeDoZNodeDesseProcesso);
    }

    public void fechar () throws InterruptedException{
        zooKeeper.close();
    }

    public void executar() throws InterruptedException{
        synchronized (zooKeeper){
            zooKeeper.wait();
        }
    }

    public void elegerLider() throws KeeperException, InterruptedException {
        //obter a lista de filhos do Znode / eleição
        //usar o zookeeper
        List<String> filhos = zooKeeper.getChildren(NAMESPACE_ELEICAO,false);
        //ordenar
        sort(filhos);
        //Verificar o primeiro da lista é igual ao atual nomedoZNodeDesseProcesso
        if (filhos.get(0).equals(nomeDoZNodeDesseProcesso)) {
            System.out.println("Sou o lider");
        } else {
            System.out.println("Não sou o lider, o lider é: " + filhos.get(0));
        }

    }

    public void conectar () throws IOException{
        zooKeeper = new ZooKeeper(
                String.format("%s:%s", HOST, PORTA),
                TIMEOUT,
                evento -> {
                    if (evento.getType() == None){
                        if (evento.getState() == Watcher.Event.KeeperState.SyncConnected) {
                            System.out.println("Tratando evento:" + Thread.currentThread().getName());
                            System.out.println("Conectou");
                        }
                        else if (evento.getState() == Watcher.Event.KeeperState.Disconnected){
                            synchronized (zooKeeper){
                                System.out.println("Desconectou");
                                System.out.println("Estamos na Thread: " + Thread.currentThread().getName());
                                zooKeeper.notify();
                            }
                        }
                    }

                }
        );
    }

}
