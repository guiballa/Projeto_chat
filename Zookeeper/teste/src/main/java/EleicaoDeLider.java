import org.apache.zookeeper.*;
import org.apache.zookeeper.data.Stat;

import static java.util.Collections.sort;
import static org.apache.zookeeper.Watcher.Event.EventType.None;

import java.io.IOException;
import java.util.Collections;
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
        eleicaoDeLider.eleicaoEReeleicao();
        //eleicaoDeLider.elegerLider();
        //eleicaoDeLider.registrarWatcher();
        eleicaoDeLider.executar();
        eleicaoDeLider.fechar();
    }

    //expressao lambda
    private Watcher reeleicaoWatcher = (event -> {
        try {
            switch (event.getType()){
                case NodeDeleted:
                    //Lider pode ter se tornado inoperante.
                    //Nova eleicao
                    eleicaoEReeleicao();
                    break;
            }

        }   catch (Exception e) {
            e.printStackTrace();
        }
    });



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

    public void eleicaoEReeleicao() throws InterruptedException, KeeperException{
        Stat statPredecessor = null;
        String nomePredecessor = "";
        do{

            List <String> candidatos = zooKeeper.getChildren(NAMESPACE_ELEICAO,false);
            Collections.sort(candidatos);
            String oMenor = candidatos.get(0);
            if (oMenor.equals(nomeDoZNodeDesseProcesso)){
                System.out.printf("Me chamo %s e sou o lider.\n", nomeDoZNodeDesseProcesso);
                return;
            }
            System.out.printf("Me chama %s e não sou o lider. O lider é o %s\n", nomeDoZNodeDesseProcesso, oMenor);
            int indicePredecessor = Collections.binarySearch(candidatos, nomeDoZNodeDesseProcesso) -1;
            nomePredecessor = candidatos.get(indicePredecessor);
            zooKeeper.exists(
                    String.format("%s/%s", NAMESPACE_ELEICAO, nomePredecessor),
                    reeleicaoWatcher
            );
        } while (statPredecessor == null);
        System.out.printf("Estou observando o %s\n", nomePredecessor);
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

//    private class TesteWatcher implements Watcher {
//
//        @Override
//        public void process(WatchedEvent event) {
//            System.out.println(event);
//            try {
//                switch (event.getType()){
//                    case NodeCreated:
//                        System.out.println("ZNode criado");
//                        break;
//
//                    case NodeDeleted:
//                        System.out.println("ZNode removido");
//                        break;
//
//                    case NodeDataChanged:
//                        System.out.println("Dados do ZNode modificados");
//                        Stat stat = zooKeeper.exists(ZNODE_TESTE_WATCH, false);
//                        byte [] bytes = zooKeeper.getData(ZNODE_TESTE_WATCH,false,stat);
//                        String dados = bytes != null ? new String(bytes) : "";
//                        System.out.println("Dados:" + dados);
//                        break;
//
//                    case NodeChildrenChanged:
//                        System.out.println("Não deveria acontecer...filhos alterados.");
//                        break;
//                }
//            }   catch (Exception e ) {
//                e.printStackTrace();
//            }
//
//        }
//    }
//
//    public void registrarWatcher (){
//        TesteWatcher watcher = new TesteWatcher();
//        try {
//            zooKeeper.addWatch(ZNODE_TESTE_WATCH,watcher,AddWatchMode.PERSISTENT_RECURSIVE);
//        }catch (Exception e){
//            e.printStackTrace();
//        }
//    }









//    private class TesteWatcher implements Watcher{
//
//        @Override
//        public void process(WatchedEvent event) {
//
//            System.out.println(event);
//            switch (event.getType()){
//                case NodeCreated:
//                    System.out.println("ZNode criado");
//                    break;
//                case NodeDeleted:
//                    System.out.println("ZNode removido");
//                    break;
//                case NodeDataChanged:
//                    System.out.println("Dados do ZNode modificados");
//                    break;
//                case NodeChildrenChanged:
//                    System.out.println("Evento envolvendo os filhos");
//                    break;
//            }
//            try {
//                registrarWatcher();
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
//        }
//    }
//
//    public void registrarWatcher() throws KeeperException, InterruptedException {
//        TesteWatcher watcher = new TesteWatcher();
//        Stat stat = zooKeeper.exists(ZNODE_TESTE_WATCH, watcher);
//        //Znode existe
//        if(stat != null){
//            byte [] bytes = zooKeeper.getData(ZNODE_TESTE_WATCH, watcher, stat);
//            String dados = bytes != null ? new String(bytes) : "";
//            System.out.printf("Dados: %s\n", dados);
//            List <String> filhos = zooKeeper.getChildren(ZNODE_TESTE_WATCH, watcher);
//            System.out.println("Filhos: " + filhos);
//        }
//    }
