import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
} from "react-native";
import { useColors } from "@/hooks/use-colors";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const LETTER_CONTENT = `親愛的家長：

寫下這封信時，我不是站在「教育專家」的位置上——我只是一個和你一樣，正在為孩子申請學校而奔走的家長。

香港的學校體系很豐富，也很複雜。學校多、路線多、要求多，選擇多得讓人以為「只要夠努力就能找到答案」。可真正開始之後你會發現：公開信息確實很多，官方資料也隨時可查，但信息越多，反而越容易把人推向焦慮。我們不是缺資料，我們缺的是秩序。

你一定也經歷過那種感覺：一邊告訴自己「要冷靜、要理性」，一邊又忍不住反覆刷新、反覆對照、反覆確認。今天看到別人說 portfolio 關鍵，明天又聽說面試才決定一切；這家學校看重英文環境，那家學校強調活動經歷；群消息一條接一條，「成功經驗」一個比一個精彩，卻很少有人告訴你——真正消耗人的，從來不是努力本身，而是努力沒有方向。

於是我們開始硬扛。一次申請十幾二十家學校，每一家不同的網上系統、不同的材料要求、不同的截止時間；同一份資料要改很多版本，portfolio 做了又做；宣講會一場接一場，排隊、登記、筆記、回家再消化；還要陪孩子練表達、練專注、備考、調整作息。你白天像項目經理，晚上像資料管理員，心裏還要再扛著一個聲音：「萬一我做得不夠，會不會耽誤孩子？」

也有人選擇中介。花費不小，買來的卻未必是踏實。你會擔心：到底靠不靠譜？會不會被套路？是不是還得自己懂，才不會被牽著走？最後你發現最諷刺的一點是：無論選擇哪條路，家長都像被迫上場——只是有人用時間硬扛，有人用金錢換不確定的安心。

我太懂這種無力了。那不是矯情，不是玻璃心，也不是你不夠強。那是因為你面對的是一座由信息洪流堆起來的迷宮：你越認真，越容易被耗盡；你越想為孩子做對，越害怕自己做錯。

有Offer 的誕生，不是為了再給你更多信息，而是為了把信息變成路徑。把香港幼稚園、小學、中學那些散落在各處、需要反覆對照、不斷驗證的資料，系統地梳理出來；把「你現在該看什麼、先做什麼、怎麼比較、怎麼避坑」變成清晰、可執行的步驟；讓家長不需要用焦慮去換理解，不需要用盲目試錯去換經驗。

我不敢說有Offer 能替你做完所有事。但我希望它能替你擋住最消耗人的那一部分——把混亂擋在外面，把清楚留給你；把焦慮降下來，把時間還給孩子；把你從「到處問、到處找、到處怕」裏拉回來，讓你重新成為一個可以穩穩陪伴的人。

因為申請學校，本來就不該是一場靠消耗換結果的戰爭。我們做的一切，也不該以把家長逼到疲憊、內疚、失眠為代價。

如果 Offer 能在你最開始的那一步，替你點一盞燈——那它就值得存在。

願你在這條路上，不再孤軍奮戰。也願我們一起，見證孩子慢慢長大。

—— 一位和你一樣正在經歷這一切的家長`;

interface IntroLetterModalProps {
  visible: boolean;
  onDismiss: () => void;
}

export function IntroLetterModal({ visible, onDismiss }: IntroLetterModalProps) {
  const colors = useColors();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onDismiss}
    >
      <TouchableWithoutFeedback onPress={onDismiss}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View
              style={[
                styles.modal,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              {/* Title */}
              <View style={styles.titleContainer}>
                <Text
                  style={[styles.title, { color: colors.foreground }]}
                >
                  給家長的一封信
                </Text>
              </View>

              {/* Scrollable letter body */}
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={true}
              >
                <Text
                  style={[styles.letterText, { color: colors.foreground }]}
                >
                  {LETTER_CONTENT}
                </Text>
              </ScrollView>

              {/* Primary button fixed at bottom */}
              <View
                style={[
                  styles.buttonContainer,
                  { borderTopColor: colors.border },
                ]}
              >
                <TouchableOpacity
                  onPress={onDismiss}
                  style={[
                    styles.primaryButton,
                    { backgroundColor: (colors as any).accent },
                  ]}
                  activeOpacity={0.85}
                >
                  <Text style={styles.primaryButtonText}>
                    陪你開啟有Offer的旅程
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export { LETTER_CONTENT };

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  modal: {
    width: SCREEN_WIDTH * 0.75,
    maxWidth: 480,
    height: SCREEN_HEIGHT * 0.75,
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
  },
  titleContainer: {
    paddingTop: 28,
    paddingBottom: 16,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 2,
    fontFamily: "NotoSerifSC-Bold",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  letterText: {
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.3,
    fontFamily: "NotoSerifSC-Regular",
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    borderTopWidth: 1,
  },
  primaryButton: {
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FAF8F5",
    letterSpacing: 1,
    fontFamily: "NotoSerifSC-Bold",
  },
});
