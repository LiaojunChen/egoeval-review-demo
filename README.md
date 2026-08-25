# EgoEval Review Demo

This is a static, shareable review page for 20 representative EgoDex episodes.
It includes playable H.264 videos, posters, frame-level evidence curves, and
the C1/X1 VLM diagnostics.

The C1 and X1 labels in this demo use one `Qwen/Qwen3-VL-8B-Instruct` model.
They are explicitly diagnostic single-model evidence, not independent
multi-model consensus. A second model is required before treating them as a
formal multi-VLM decision.

By default, eight review episodes are hidden for the shareable demo view. Use
the `显示隐藏样本（8）` checkbox in the page header to switch to the full
20-episode view. The hidden episode IDs are `001441`, `007646`, `012274`,
`013626`, `021758`, `031820`, `043071`, and `044118`.

The page contains only derived static artifacts. It does not contain API keys,
source parquet files, or the original full-resolution videos.
